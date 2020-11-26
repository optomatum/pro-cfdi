import {app, BrowserWindow, dialog, ipcMain, screen} from 'electron';
import * as path from 'path';
import {extname, resolve} from 'path';
import * as url from 'url';
import {Between, Column, createConnection, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

import {readdirSync, readFileSync} from "fs";
import {xml2js} from "xml-js";


//import {CfdiModel, Concepto} from "./src/assets/model/cfdi.model";
//import {CfdiSchema} from "./src/assets/model/cfdi.schema";
//import {ConceptosSchema} from "./src/assets/model/conceptos.schema";


let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

async function createWindow(): Promise<BrowserWindow> {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  const connection = await createConnection({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: './src/assets/data/database.sqlite',
    entities: [CfdiSchema, ConceptosSchema]
  });

  const cfdiRepository = connection.getRepository(CfdiSchema);
  const conceptosRepository = connection.getRepository(ConceptosSchema);

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });


  ipcMain.on('open-file-dialog', (event) => {

    const files = dialog.showOpenDialogSync({
      properties: [

        'openDirectory'
      ]
    });
    event.returnValue = files;

  });
  ipcMain.on('get-files-from-path', (event, path) => {
    //console.log('get-files-from-path');
    //console.log(path);
    if (typeof path !== 'undefined' && path !== "") {

      event.returnValue = readPathFiles(path);
    } else {
      event.returnValue = '';
    }
  });

  ipcMain.on('get-file-content', (event, filename) => {
    //console.log(readXmlFile(filename));
    event.returnValue = readXmlFile2(filename);
  });

  ipcMain.on('data-cfdi-save', async (event, cfdi: CfdiModel) => {

    try {
      const cfdiSchema: CfdiSchema = new CfdiSchema();
      cfdiSchema.uuid = cfdi.complemento.uuid;
      cfdiSchema.rfcEmisor = cfdi.emisor.rfc;
      cfdiSchema.nombreEmisor = cfdi.emisor.nombre;
      cfdiSchema.rfcReceptor = cfdi.receptor.rfc;
      cfdiSchema.nombreReceptor = cfdi.receptor.nombre;
      cfdiSchema.total = cfdi.total;
      cfdiSchema.subtotal = cfdi.subtotal;
      cfdiSchema.fecha = cfdi.complemento.fechaTimbrado;
      cfdiSchema.tipoComprobante = cfdi.tipoComprobante;
      cfdiSchema.moneda = cfdi.moneda;
      const cfdiItem = cfdiRepository.create(cfdiSchema);
      event.returnValue = await cfdiRepository.save(cfdiItem);
    } catch (e) {
      throw e;
    }
  });

  ipcMain.on('data-conceptos-save', async (event, uuid, concepto: Concepto) => {

    console.log(uuid);
    console.log(concepto);
    try {
      const conceptosSchema: ConceptosSchema = new ConceptosSchema();
      conceptosSchema.uuid = uuid;
      ({
        cantidad: conceptosSchema.cantidad,
        descripcion: conceptosSchema.descripcion,
        importe: conceptosSchema.importe,
        valorUnitario: conceptosSchema.valorUnitario,
      } = concepto);
      const conceptoItem = conceptosRepository.create(conceptosSchema);
      console.log(conceptosSchema);
      console.log(conceptoItem);
      event.returnValue = await conceptosRepository.save(conceptoItem);
    } catch (e) {
      throw e;
    }
  });

  ipcMain.on('cfdi-get-distinct-emisor', async (event) => {

    event.returnValue = await cfdiRepository.createQueryBuilder("cfdi").select('rfcEmisor').addSelect('nombreEmisor').distinct(true).getRawMany();
  });

  ipcMain.on('cfdi-get-distinct-receptor', async (event) => {

    event.returnValue = await cfdiRepository.createQueryBuilder("cfdi").select('rfcReceptor').addSelect('nombreReceptor').distinct(true).getRawMany();


  });

  ipcMain.on('cfdi-get-between-dates', async (event) => {

    event.returnValue = await cfdiRepository.find({
      where: {
        fecha: Between('2020-08-20', '2020-08-31'),
      }
    });

  });

  ipcMain.on('cfdi-get-filtered', async (event, rfcEmisor, rfcReceptor, inicio, fin) => {


    const whereObj = {};
    if (typeof rfcEmisor !== 'undefined' && rfcEmisor !== null) {
      whereObj['rfcEmisor'] = rfcEmisor;
    }
    if (typeof rfcReceptor !== 'undefined' && rfcReceptor !== null) {
      whereObj['rfcReceptor'] = rfcReceptor;
    }
    if ((typeof inicio !== 'undefined' && inicio !== null) && (typeof fin !== 'undefined' && fin !== null)) {
      whereObj['fecha'] = Between(inicio, fin);
    }
    if (!isEmpty(whereObj)) {
      const cfdiSchema = await cfdiRepository.find({
        where: whereObj

      });
      const cfdiModelArray: CfdiModel[] = [];
      cfdiSchema.forEach(element => {
        const cfdiModel: CfdiModel = new CfdiModel();


        cfdiModel.emisor.nombre = element.nombreEmisor;
        cfdiModel.emisor.rfc = element.rfcEmisor;
        cfdiModel.receptor.rfc = element.rfcReceptor;
        cfdiModel.receptor.nombre = element.nombreReceptor;
        cfdiModel.complemento.uuid = element.uuid;
        cfdiModel.complemento.fechaTimbrado = element.fecha;
        cfdiModel.subtotal = element.subtotal;
        cfdiModel.total = element.total;
        cfdiModel.tipoComprobante = element.tipoComprobante;
        cfdiModel.moneda = element.moneda;

        cfdiModelArray.push(cfdiModel);

      });

      return event.returnValue = cfdiModelArray;
    } else {
      event.returnValue = [];
    }

    /* if (!isEmpty(whereObj)) {
      event.returnValue = await cfdiRepository.find({
        where: whereObj

      }).then(value => {
        console.log(value);
      }

      );
    }else {
      event.returnValue = null;
    }*/
  });

  ipcMain.on('conceptos-get-by-uuid', async (event, uuid) => {
    const conceptosSchema = await conceptosRepository.find(
      {
        where: {
          uuid: uuid
        }
      });
    const conceptosArray: Concepto[] = [];
    conceptosSchema.forEach(element => {
      const concepto: Concepto = new Concepto();
      concepto.cantidad = element.cantidad;
      concepto.descripcion = element.descripcion;
      concepto.valorUnitario = element.valorUnitario;
      concepto.importe = element.importe;
      conceptosArray.push(concepto);
    });
    return event.returnValue = conceptosArray;

  });


  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow().then(r => {
      });
    }
  });

} catch (e) {
  // Catch Error
  throw e;
}

const readPathFiles = function (path) {
  console.log('readPathFiles');
  console.log(path);
  const dirents = readdirSync(path, {encoding: 'ascii', withFileTypes: true});
  /*const files = await Promise.all(dirents.map(
      (dirent: Dirent) => {
          const res = resolve(path, dirent.name);
          console.log(extname(dirent.name));

          return dirent.isDirectory() ? this.readPathFiles(res) : (res) => {
                  if (extname(res) === '.xml') { return res; }
              };

      }));
  const concat = Array.prototype.concat(...files);

  return concat;*/

  const files = dirents
    .filter(file => !file.isDirectory())
    .filter(file => (extname(file.name) === '.xml'))
    .map(file => ({...file, path: resolve(path, file.name)}));
  // .map(file => ({...file, path: (path + file.name).split(/\ /).join('\ ')}));

  const folders = dirents.filter(folder => folder.isDirectory());

  for (const folder of folders) {
    const res = resolve(path, folder.name);
    files.push(...readPathFiles(res));
  }
  //console.log(files);
  return files;
};


const readXmlFile2 = function (filename) {
  let cfdiXml: Object = {};
  const cfdiModel: CfdiModel = new CfdiModel();

  const data = readFileSync(filename);


  cfdiXml = xml2js(data.toString(),
    {
      compact: true,
      ignoreDeclaration: true,
      attributeValueFn: (val) => {
        return val.toUpperCase();
      }
    }
  );
  //console.log('antes parser');
  //console.log(JSON.stringify(cfdiXml));

  cfdiModel.moneda = cfdiXml['cfdi:Comprobante']._attributes.Moneda;
  cfdiModel.formaPago = cfdiXml['cfdi:Comprobante']._attributes.FormaPago;
  cfdiModel.metodoPago = cfdiXml['cfdi:Comprobante']._attributes.MetodoPago;
  cfdiModel.subtotal = cfdiXml['cfdi:Comprobante']._attributes.SubTotal;
  cfdiModel.total = cfdiXml['cfdi:Comprobante']._attributes.Total;
  cfdiModel.tipoComprobante = cfdiXml['cfdi:Comprobante']._attributes.TipoDeComprobante;
  cfdiModel.fecha = cfdiXml['cfdi:Comprobante']._attributes.Fecha;
  cfdiModel.folio = cfdiXml['cfdi:Comprobante']._attributes.Folio;
  cfdiModel.serie = cfdiXml['cfdi:Comprobante']._attributes.Serie;
  const receptor = {"rfc": "", "nombre": ""};
  receptor.rfc = cfdiXml['cfdi:Comprobante']['cfdi:Receptor']._attributes.Rfc;
  receptor.nombre = cfdiXml['cfdi:Comprobante']['cfdi:Receptor']._attributes.Nombre;
  cfdiModel.receptor = receptor;
  const emisor = {"rfc": "", "nombre": ""};
  emisor.rfc = cfdiXml['cfdi:Comprobante']['cfdi:Emisor']._attributes.Rfc;
  emisor.nombre = cfdiXml['cfdi:Comprobante']['cfdi:Emisor']._attributes.Nombre;
  cfdiModel.emisor = emisor;
  const conceptos = cfdiXml['cfdi:Comprobante']['cfdi:Conceptos'];
  const conceptosArray = [];
  if (Array.isArray(conceptos['cfdi:Concepto'])) {
    for (const i in conceptos['cfdi:Concepto']) {
      const concepto: Concepto = new Concepto();


      /*      concepto = {
        Cantidad: concepto.cantidad,
        Importe: concepto.importe,
        Descripcion: concepto.descripcion,
        ValorUnitario: concepto.valorUnitario
      } = conceptos['cfdi:Concepto'][i]['_attributes'];*/

      concepto.cantidad = conceptos['cfdi:Concepto'][i]['_attributes'].Cantidad;
      concepto.importe = conceptos['cfdi:Concepto'][i]['_attributes'].Importe;
      concepto.descripcion = conceptos['cfdi:Concepto'][i]['_attributes'].Descripcion;
      concepto.valorUnitario = conceptos['cfdi:Concepto'][i]['_attributes'].ValorUnitario;


      conceptosArray.push(concepto);
      cfdiModel.conceptos = conceptosArray;
    }
  } else {

    if (Object.keys(conceptos['cfdi:Concepto']._attributes).length > 0) {

      const concepto: Concepto = new Concepto();
      /*      concepto = {
        Cantidad: concepto.cantidad,
        Importe: concepto.importe,
        Descripcion: concepto.descripcion,
        ValorUnitario: concepto.valorUnitario
      } = conceptos['cfdi:Concepto']['_attributes'];*/
      concepto.cantidad = conceptos['cfdi:Concepto']['_attributes'].Cantidad;
      concepto.importe = conceptos['cfdi:Concepto']['_attributes'].Importe;
      concepto.descripcion = conceptos['cfdi:Concepto']['_attributes'].Descripcion;

      concepto.valorUnitario = conceptos['cfdi:Concepto']['_attributes'].ValorUnitario;

      const conceptosArray = [];

      conceptosArray.push(concepto);
      cfdiModel.conceptos = conceptosArray;
    }
  }
  const complemento = cfdiXml['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital'];


  const complementoObj = {
    "fechaTimbrado": "",
    "uuid": ""
  };


  complementoObj.fechaTimbrado = complemento._attributes.FechaTimbrado;
  complementoObj.uuid = complemento._attributes.UUID;
  cfdiModel.complemento = complementoObj;

  if ('cfdi:Impuestos' in cfdiXml['cfdi:Comprobante']) {
    const impuesto: Impuesto = new Impuesto();

    if ('_attributes' in cfdiXml['cfdi:Comprobante']['cfdi:Impuestos']) {
      if ('TotalImpuestosRetenidos' in cfdiXml['cfdi:Comprobante']['cfdi:Impuestos']._attributes) {
        impuesto.totalImpuestosRetenidos = cfdiXml['cfdi:Comprobante']['cfdi:Impuestos']._attributes['TotalImpuestosRetenidos'];
      }
      if ('TotalImpuestosTrasladados' in cfdiXml['cfdi:Comprobante']['cfdi:Impuestos']._attributes) {
        impuesto.totalImpuestosTrasladados = cfdiXml['cfdi:Comprobante']['cfdi:Impuestos']._attributes['TotalImpuestosTrasladados'];
      }
      cfdiModel.impuesto = impuesto;
    }
  }

  //console.log('despues parser');
  //console.log(cfdiModel);
  return cfdiModel;

};

function isEmpty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}


class CfdiModel {
  emisor: Emisor = new Emisor();
  receptor: Receptor = new Receptor();

  total: string;
  subtotal: string;
  metodoPago: string;
  tipoComprobante: string;
  formaPago: string;
  conceptos: Concepto[] = [{}];
  moneda: string;
  impuesto: Impuesto;
  fecha: Date;
  folio: string;
  serie: string;
  complemento: Complemento = new Complemento();
}

class Concepto {
  /*    cantidad: string;
      descripcion: string;
      valorUnitario: string;
      importe: string;
      impuestos: Impuesto[];*/
  constructor(public cantidad?: string,
              public descripcion?: string,
              public valorUnitario?: string,
              public importe?: string,
              public impuestos?: Impuesto[]) {

  }

}

class Impuesto {
  totalImpuestosTrasladados: string;
  totalImpuestosRetenidos: string;
  base: string;
  impuesto: string;
  tipoFactor: string;
  tasaCuota: string;
  importe: string;
}

class Emisor {
  rfc: string;
  nombre: string;

}

class Receptor {
  rfc: string;
  nombre: string;
}

class Complemento {
  uuid: string;
  fechaTimbrado: string;
}

@Entity()
class CfdiSchema {
  @PrimaryColumn()
  uuid: string;

  @Column()
  rfcEmisor: string;
  @Column({nullable: true})
  nombreEmisor: string;
  @Column()
  rfcReceptor: string;
  @Column({nullable: true})
  nombreReceptor: string;
  @Column("float", {nullable: true})
  subtotal: string;
  @Column("float", {nullable: true})
  total: string;
  @Column("date", {nullable: true})
  fecha: string;

  /*
    @ManyToOne(()=> ConceptosSchema,conceptosSchema => conceptosSchema.uuid)
    conceptosSchema = ConceptosSchema;*/
  @Column({nullable: true})
  tipoComprobante: string;
  @Column({nullable: true})
  moneda: string;
}


@Entity()
class ConceptosSchema {

  @PrimaryGeneratedColumn()
  id: string;
  @Index()
  @Column()
  uuid: string;
  @Column("float", {nullable: true})
  cantidad: string;
  @Column("varchar", {length: 50, nullable: true})
  descripcion: string;
  @Column("float", {nullable: true})
  valorUnitario: string;
  @Column("float", {nullable: true})
  importe: string;


  /*@OneToMany(()=> CfdiSchema, cfdiSchema => cfdiSchema.uuid)
  conceptos: ConceptosSchema[];*/
}
