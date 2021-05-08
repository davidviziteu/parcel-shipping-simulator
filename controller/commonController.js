module.exports = {
    getAWB:(req,res)=>
        {
            console.log(req.body)
            if (req.body.AWB) {
                if (dbAWB.find(function (arg) {
                    return arg == req.body.AWB;
                }))
                    return res.status(200).json({
                        "succes": true
                    })
                else return res.status(200).json({
                    "succes": false
                })
            }
            return res.status(400).json({
                error: `Missing 'AWB' filed from request`
            })
        }

}