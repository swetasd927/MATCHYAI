declare module "pdf-parse" {
    export interface PdfPageData {
        pageIndex: number;
        view: number[];
        getTextContent(): Promise<{ items: Array<{ str: string }> }>;
    }

    export interface PdfParseOptions {
        pagerender?: (pageData: PdfPageData) => string | Promise<string>;
        max?: number;
        version?: string;
    }

    export interface PdfParseResult {
        text: string;
        numpages: number;
        info: Record<string, string | number | boolean | null>;
        metadata: Record<string, string | number | boolean | null>;
        version: string;
    }

    function pdfParse(dataBuffer: Buffer, options?: PdfParseOptions): Promise<PdfParseResult>;
    export = pdfParse;
}
