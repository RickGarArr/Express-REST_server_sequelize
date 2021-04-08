import { Request } from "express";

export default interface ISolicitudRequest extends Request{
    directorio: string;
    doc_ine: string;
    doc_rfc: string;
    doc_dom: string;
}