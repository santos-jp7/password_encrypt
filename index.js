require("dotenv/config");

const knex = require('knex')
const bcrypt = require('bcryptjs');

let i = 0;

const db = knex({
    client: process.env.CLIENT,
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
});

async function allData(){
    return await db
                .select("*")
                .from("users")
                .whereNull("password")
}

async function updateData({id, senha, email, username}){
    i++;
    console.log(`Total de dados carregados: ${i}`);

    const hash = bcrypt.hashSync(senha, 12);

    const modify = await db("users").update({password: hash}).where({id: id});

    console.log(`Change ${modify} = ${username} - ${email} (${id}): ${senha} -> ${hash}`);
}

(async function(){
    const data = await allData();

    data.forEach(updateData);
})();