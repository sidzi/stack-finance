import {Inject, Service} from "typedi";

@Service()
class MockStockService {
  constructor(@Inject("stocks") private stockSchema) {}
}
