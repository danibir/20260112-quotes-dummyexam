
const responseMessage = (data, id, string, css) => {
    data[id] = [string, css]
    return data
}

module.exports = {
    responseMessage
}