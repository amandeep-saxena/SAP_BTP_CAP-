const cds = require('@sap/cds');
const express = require('express');
const req = require('express/lib/request');
const { write } = require('fs');
app = express();

class MyService extends cds.ApplicationService {

    async init() {
        // const db = await cds.connect.to('db');

        const { PurchasesInfo } = cds.entities('Moresco');
        const { Chart_of_Accounts } = cds.entities('Moresco');

        this.on('READ', 'dup', async (req) => {

            let add = await SELECT.from(PurchasesInfo)
            console.log(JSON.stringify(add))
            return add;
            // let add = await SELECT.one.from(invoice).where({ NAME: "dep" })
            //     .columns({NAME})
            // return add;

            // let  one = await SELECT.one.from (invoice)
            // return one;

        })


        this.on('CREATE', 'PurchasesInfo', async (req) => {
            // const { data } = req;
            // const keys = Object.keys(data);
            // const values = Object.values(data);

            // console.log(keys, values);
            // const insertedData = await INSERT.into(PurchasesInfo).columns(keys).values(values);
            // return insertedData;

            let { data } = req;
            console.log(data);

            const insertPromises = [];

            for (let i = 0; i < data.length; i++) {

                const insertPromise = INSERT.into(PurchasesInfo)
                    .columns("Id", "fromDate", "toDate", "projectId")
                    .values(data[i]['Id'], data[i]['fromDate'], data[i]['toDate'], data[i]['projectId']);

                insertPromises.push(insertPromise);
            }

            return insertPromises;


        })

        this.on('CREATE', 'Chart_of_Accounts', async (req) => {
            const { data } = req;
            const keys = Object.keys(data);
            const values = Object.values(data);

            console.log(keys, values);
            const insertedData = await INSERT.into(Chart_of_Accounts).columns(keys).values(values);
            return insertedData;

            // try {
            //     const tranData = req.data;

            //     if (!Array.isArray(tranData)) {
            //         throw new Error("Invalid data format. Expected an array.");
            //     }


            //     const insertPromises = tranData.map(async (item) => {
            //         return INSERT.into(Chart_of_Accounts)
            //             .columns("Id", "GL_Account", "Description", "GL_Account_Posting_Block", "Open_Item_Management", "GL_Account_Type")
            //             .values(item['Id'], item['GL_Account'], item['Description'], item['GL_Account_Posting_Block'], item['Open_Item_Management'], item['GL_Account_Type']);
            //     });


            //     const insertedData = await Promise.all(insertPromises);


            //     return insertedData;
            // } catch (error) {
            //     console.error("Error in 'CREATE' handler:", error);
            //     throw error;
            // }

        });

        // // let tranData = [{
        // //     "Id": 6,
        // //     "fromDate": "2023-03-07",
        // //     "toDate": "2024-06-16",
        // //     "projectId": 23
        // // }]
        // let tranData = req.data

        // for (let i = 0; i < tranData.length; i++) {
        //     await INSERT.into(PurchasesInfo)
        //         .columns("Id", "fromDate", "toDate", "projectId")
        //         .values(tranData[i]['Id'], tranData[i]['fromDate'], tranData[i]['toDate'], tranData[i]['projectId']);
        // }
        // let add = await SELECT.from(PurchasesInfo);
        // return add;


        // this.on('READ', 'PurchasesInfo', async (req) => {
        //     
        //     const { ID } = req.params;
        //     const record = await SELECT.from(PurchasesInfo).where({ ID });
        //     return record;
        //   });


        this.on('UPDATE', 'PurchasesInfo', async (req) => {

            const { Id } = req.params;
            const { data } = req;
            console.log(Id)
            console.log("data", data)
            const result = await UPDATE(PurchasesInfo).set(data).where({ Id: data.Id });
            // console.log(JSON.stringify(result))
            return { result };
        });


        /////// update service ////////////////////////////////////////////////


        this.on('UPDATE', 'Chart_of_Accounts', async (req) => {

            const { Id } = req.params;
            const { data } = req;
            console.log(Id)
            console.log("data", data)
            const result = await UPDATE(Chart_of_Accounts).set(data).where({ Id: data.Id });
            // console.log(JSON.stringify(result))
            return { result };
        });

        this.on('READ', 'Chart_of_Accounts', async (req) => {
            const { Id } = req.params;
            console.log(Id);
            const recordTo = await DELETE.from(Chart_of_Accounts).where({ Id });
            console.log(recordTo)
            return recordTo
            // return { recordTo, success: true, message: `Record with ID ${Id} deleted successfully.` };
        })


        this.on('READ', 'PurchasesInfo', async (req) => {
            const { Id } = req.params;
            console.log(Id);
            const recordTo = await DELETE.from(PurchasesInfo).where({ Id });
            console.log(recordTo)
            return { recordTo }
            // return { recordTo, success: true, message: `Record with ID ${Id} deleted successfully.` };
        })



        

        await super.init();
    }
}




module.exports = { MyService };