import express from "express";

import client from "prom-client";

const app = express();

export const resTimeHist = new client.Histogram({
  name: "Response_Time_Duration_Seconds",
  help: "Response Time Duration Seconds",
  labelNames: ["method", "route", "status_code"],
});
export const dbResTimeHist = new client.Histogram({
  name: "Database_Response_Time_Duration_Seconds",
  help: "Database Response Time Duration Seconds",
  labelNames: ["operation", "success"],
});

export function initMetricsServer() {
  const def_metrics = client.collectDefaultMetrics;
  def_metrics();

  app.get("/metrics", async (req, res) => {
    const prom_metrics = await client.register.metrics();
    res.set("Content-Type", client.register.contentType);
    return res.send(prom_metrics);
  });

  app.listen(9100, () => {
    console.log("metrics server started at http://localhost:9100");
  });
}
