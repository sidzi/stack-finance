import { Service, Inject } from "typedi";
import { ClientService } from "./ClientService";

@Service()
export class DBObserverService {
  constructor(@Inject("stocks") private stocksSchema) {}

  startObserving() {
    setInterval(this.checkDocs, 1000);
  }

  private checkDocs() {
    console.log(this.stocksSchema.find({}));
  }
}
