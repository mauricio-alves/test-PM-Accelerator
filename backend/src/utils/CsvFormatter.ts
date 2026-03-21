export class CsvFormatter {
  static formatHistory(history: any[]): string {
    const headers = "id,city,temp,description,humidity,windSpeed,icon,createdAt\n";
    const rows = history
      .map((r) => {
        const date = r.createdAt instanceof Date ? r.createdAt.toISOString() : new Date(r.createdAt).toISOString();
        return `${r.id},"${r.city}",${r.temp},"${r.description}",${r.humidity},${r.windSpeed},"${r.icon}",${date}`;
      })
      .join("\n");

    return headers + rows;
  }
}
