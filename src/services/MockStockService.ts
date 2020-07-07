import { Service, Inject } from "typedi";
import { Document, model } from "mongoose";
import IStockSchema from "../models/StocksSchema";

@Service()
class MockStockService {
  constructor(@Inject("stocks") private stockSchema) {}
}
