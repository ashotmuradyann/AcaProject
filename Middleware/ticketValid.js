const expect = require("../library/expect.js");

module.exports={
    ticketValid: (req,res,next)=>{
        const {name,description,price,quantity,countries,date}=req.body;
        
        expect(name).param("name").to.be.a('string').and.have.length.above(2);
        expect(description).param("description").to.be.a('string').and.have.length.above(5);
        expect(price).param("price").to.be.a('number').and.above(10);
        expect(quantity).param("quantity").to.be.a('number').and.above(0);
        expect(countries).param("countries").to.be.a('array').and.have.length.above(0);
        expect(date).param("date").to.be.a('string').and.have.length.above(4);

        next();
    }

}