import { CommerceRepository } from "@backoffice-contexts/commerces/domain/CommerceRepository";
import EmailVo from "@shared/domain/EmailVo";
import { Nullable } from "@shared/domain/Nullable";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce";
import UuidVo from "@shared/domain/UuidVo";
import { Collection, Db } from "mongodb";

const COLLECTION = "Commerces";
export default class MongoCommerceRepository implements CommerceRepository {
  private collection: Collection<any>;

  constructor(db: Db) {
      this.collection = db.collection(COLLECTION);
  }

  async findByEmail(email: EmailVo): Promise<Nullable<Commerce>> {
      const found = await this.collection.findOne({ email: email.value });
      return Commerce.fromPrimitives({
          ...found,
          id: found._id
      });
  }

  async findById(id: UuidVo): Promise<Nullable<Commerce>> {
      const found = await this.collection.findOne({ _id: id.value });
      return Commerce.fromPrimitives({
          ...found,
          id: found._id
      });

  }

  async save(commerce: Commerce): Promise<void> {
      const {
          id,
          ...primitives
      } = commerce.toPrimitives();
      await this.collection.insertOne({
          ...primitives,
          _id: id,
          id: undefined
      });

  }

}
