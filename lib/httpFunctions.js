/*
    HTTP Client
    Credits: https://gist.github.com/billybong/a462152889b6616deb02
*/
function httpGet(theUrl) {
    var con = new java.net.URL(theUrl).openConnection();
    con.requestMethod = "GET";

    return asResponse(con);
}

function httpPost(theUrl, data, contentType) {
    contentType = contentType || "application/json";
    var con = new java.net.URL(theUrl).openConnection();

    con.requestMethod = "POST";
    con.setRequestProperty("Content-Type", contentType);

    // Send post request
    con.doOutput = true;
    write(con.outputStream, data);

    return asResponse(con);
}

function asResponse(con) {
    var d = read(con.inputStream);

    return { data: d, statusCode: con.responseCode };
}

function write(outputStream, data) {
    var wr = new java.io.DataOutputStream(outputStream);
    wr.writeBytes(data);
    wr.flush();
    wr.close();
}

function read(inputStream) {
    var inReader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
    var inputLine;
    var response = new java.lang.StringBuffer();

    while ((inputLine = inReader.readLine()) != null) {
        response.append(inputLine);
    }
    inReader.close();
    return response.toString();
}
