export interface SendEmailReqType {
  reqBody: Record<string, any>;
  sendToEmail: string;
}

export interface SendEmailResponseType {
  // TODO any
  errors: Array<any>;
  offerId: string;
  offerNumber: string;
  sentToEmail: boolean;
  // TODO any
  warnings: Array<any>;
}

export interface DownloadPdfResponseType extends SendEmailResponseType {
  offerDownloadLink: {
    rel: string;
    href: string;
  };
}
