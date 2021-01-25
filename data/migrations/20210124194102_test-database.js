
exports.up =async function(knex) {
  await knex.schema.createTable("tests", tbl => {
      tbl.increments()
      tbl.text("username", 225).notNull().unique()
      tbl.text("password", 225).notNull()
  })
};

exports.down =async function(knex) {
  await knex.schema.dropTableIfExists("tests")
};
