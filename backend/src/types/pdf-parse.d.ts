declare module "pdf-parse" {
    function pdfParse(dataBuffer: Buffer, options?: any): Promise<{
        text: string;
        numpages: number;
        info: any;
        metadata: any;
        version: any;
    }>;
    export = pdfParse;
}
