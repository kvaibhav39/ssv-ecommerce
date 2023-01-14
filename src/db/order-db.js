const db = require("./db-connect");

module.exports = class Order {
  constructor(id, orderDescription, createdAt, productIds) {
    this.id = id;
    this.orderDescription = orderDescription;
    this.createdAt = createdAt;
    this.productIds = productIds;
  }

  async save() {
    try {
      var insert_columns = [],
        actual_values = [];

      for (var key of Object.keys(this)) {
        if (typeof this[key] === "string") {
          insert_columns.push(`"${key}"`);
          actual_values.push(`'${this[key]}'`);
        }
      }

      let response = await db.query(
        'INSERT INTO "ORDERS" (' +
          insert_columns.join(",") +
          ") VALUES (" +
          actual_values.join(",") +
          ") RETURNING id"
      );
      //   let response = await db.query(
      //     `INSERT INTO "ORDERS" ("orderDescription") VALUES ('${this.orderDescription}') RETURNING id`
      //   );
      console.log("response", response.rows[0].id);
      let insertId = response.rows[0].id;

      for (let i = 0; i < this.productIds.length > 0; i++) {
        let insert_columns = [],
          actual_values = [];

        insert_columns.push(`"productId"`);
        actual_values.push(this.productIds[i]);
        insert_columns.push(`"orderId"`);
        actual_values.push(insertId);

        console.log(
          'INSERT INTO "OrderProductMap" (' +
            insert_columns.join(",") +
            ") VALUES (" +
            actual_values.join(",") +
            ") RETURNING id"
        );

        let inserted_data = await db.query(
          'INSERT INTO "OrderProductMap" (' +
            insert_columns.join(",") +
            ") VALUES (" +
            actual_values.join(",") +
            ") RETURNING id"
        );
      }

      return response;
    } catch (error) {
      console.log("error", error);
      const err = new Error("Unable to create order");
      err.statusCode = 500;
      throw err;
    }
  }

  static async update({ orderDescription, id, productIds }) {
    try {
      let response = await db.query(
        `UPDATE "ORDERS" SET "orderDescription" = '${orderDescription}' WHERE id = ${id}`
      );

      await db.query(`DELETE FROM "OrderProductMap" WHERE "orderId" = ${id}`);

      if (productIds.length > 0) {
        for (let i = 0; i < productIds.length > 0; i++) {
          let insert_columns = [],
            actual_values = [];

          insert_columns.push(`"productId"`);
          actual_values.push(productIds[i]);
          insert_columns.push(`"orderId"`);
          actual_values.push(id);

          console.log(
            'INSERT INTO "OrderProductMap" (' +
              insert_columns.join(",") +
              ") VALUES (" +
              actual_values.join(",") +
              ") RETURNING id"
          );

          let inserted_data = await db.query(
            'INSERT INTO "OrderProductMap" (' +
              insert_columns.join(",") +
              ") VALUES (" +
              actual_values.join(",") +
              ") RETURNING id"
          );
        }
      }
      return response;
    } catch (error) {
      console.log(error);

      const err = new Error("Unable to update order");
      err.statusCode = 500;
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      //   console.log(
      //     `DELETE FROM "OrderProductMap" WHERE orderId = ${id}`,
      //     `DELETE FROM "ORDERS" WHERE id = ${id}`
      //   );
      await db.query(`DELETE FROM "OrderProductMap" WHERE "orderId" = ${id}`);
      await db.query(`DELETE FROM "ORDERS" WHERE id = ${id}`);
      return true;
    } catch (error) {
      const err = new Error("Unable to delete order.");
      err.statusCode = 500;
      throw err;
    }
  }

  static async fetchAll(searchField) {
    if (!searchField) searchField = "";
    try {
      let response = await db.query(
        `SELECT o.*,COUNT(opm.id) as count_of_product FROM "ORDERS" o LEFT OUTER JOIN "OrderProductMap" opm ON opm."orderId" = o.id WHERE o."orderDescription" LIKE '%${searchField}%' GROUP BY opm."orderId",o.id ORDER BY o."createdAt" DESC`
      );
      return response.rows;
    } catch (error) {
      console.log("error", error);
      const err = new Error("Unable to fetch order");
      err.statusCode = 500;
      throw err;
    }
  }

  //we should make seprate file for this.But base on requirement i continue with this file

  static async fetchAllProducts() {
    try {
      let response = await db.query(
        `SELECT p.* FROM "PRODUCTS" p  ORDER BY p.id DESC`
      );
      return response.rows;
    } catch (error) {
      console.log("error", error);
      const err = new Error("Unable to fetch products");
      err.statusCode = 500;
      throw err;
    }
  }

  static async findById(id) {
    try {
      let response = await db.query(
        `SELECT o.*,array_agg(opm."productId") as product_ids FROM "ORDERS" o LEFT OUTER JOIN "OrderProductMap" opm ON opm."orderId" = o.id WHERE o.id = ${id} GROUP BY o.id `
      );
      console.log(response.rows);
      if (response.rows.length > 0) {
        return response.rows[0];
      } else {
        const err = new Error("Unable to find order");
        err.statusCode = 404;
        throw err;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
};
