import type { Request, Response } from "express";
export declare class WeatherController {
    static getWeatherByCity(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHistory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getSearchLogs(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=WeatherController.d.ts.map