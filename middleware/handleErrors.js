module.exports = (error, request, response, next) => {
    console.error(error)
    console.log(error.name)
    if(error.name == 'CastError'){
        response.status(400).send({error: error.name})
    }else{
        response.status(500).end()
    }
}