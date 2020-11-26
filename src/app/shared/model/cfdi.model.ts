/*
/!*export class CfdiModel{
    uuid:string;
    tipoComprobante:string;
    rfcEmirsor:string;
    rfcReceptor:string;
}*!/
export class CfdiModel {
  declaration: Declaration;
  elements: Element[];
}

export interface Declaration {
  attributes: Attributes;
}

export interface Attributes {
  version: string;
  encoding: string;
}

export interface Element {
  type: string;
  name: string;
  attributes: Attributes2;
  elements: Element2[];
}

export interface Attributes2 {
  'xmlns:xsi': string;
  'xsi:schemaLocation': string;
  LugarExpedicion: string;
  MetodoPago: string;
  TipoDeComprobante: string;
  Total: string;
  Moneda: string;
  Certificado: string;
  SubTotal: string;
  NoCertificado: string;
  FormaPago: string;
  Sello: string;
  Fecha: string;
  Folio: string;
  Serie: string;
  Version: string;
  'xmlns:cfdi': string;
}

export interface Element2 {
  type: string;
  name: string;
  attributes?: Attributes3;
  elements?: Element3[];
}

export interface Attributes3 {
  TotalImpuestosTrasladados?: string;
  Rfc?: string;
  Nombre?: string;
  RegimenFiscal?: string;
  UsoCFDI?: string;
}

export interface Element3 {
  type: string;
  name: string;
  attributes?: Attributes4;
  elements?: Element4[];
}

export interface Attributes4 {
  'xmlns:tfd'?: string;
  'xsi:schemaLocation'?: string;
  Version?: string;
  UUID?: string;
  FechaTimbrado?: string;
  RfcProvCertif?: string;
  SelloCFD?: string;
  NoCertificadoSAT?: string;
  SelloSAT?: string;
  ClaveProdServ?: string;
  Cantidad?: string;
  ClaveUnidad?: string;
  Descripcion?: string;
  ValorUnitario?: string;
  Importe?: string;
}

export interface Element4 {
  type: string;
  name: string;
  attributes?: Attributes5;
  elements?: Element5[];
}

export interface Attributes5 {
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: string;
  Importe: string;
}

export interface Element5 {
  type: string;
  name: string;
  elements: Element6[];
}

export interface Element6 {
  type: string;
  name: string;
  attributes: Attributes6;
}

export interface Attributes6 {
  Base: string;
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: string;
  Importe: string;
}
*/
export class CfdiModel {
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

export class Concepto {
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
