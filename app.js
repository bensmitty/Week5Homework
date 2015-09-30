var mysql = require('mysql');
var http = require('http');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'CSC443'
});

function handle_incoming_request(req, res){
    console.log("Incoming request: (" + req.method + ") " + req.url);

    res.writeHead(200, { "Content-Type": "application/json"});

    connection.connect();


    var testid = req.url.substr(1);
//connection.query('SELECT * FROM product WHERE id="1234567"', function(err, rows, fields)
    connection.query('SELECT * FROM product WHERE id=' + testid, function(err, rows, fields)
    {
        if (!err)
        {
            if (rows.length > 0)
            {
                console.log(rows);
            }
            else
            {
                console.log("No product '" + testid + "' found");
            }

        }
        else
        {
            console.log(err);
        }

    });

    connection.end();

    if (req.url.substr(1) == "1234567")
    {
        res.write('{"product_id":"1234567","price":"$99.99"}');
    }
    else if (req.url.substr(1) == "5555555")
    {
        res.write('{"product_id":"5555555","price":"$4.99"}');
    }
    else if (req.url.substr(1) == "8888888")
    {
        res.write('{"product_id":"8888888","price":"$19.99"}');
    }
    else
    {
        res.write("Product not found");
    }

    res.end();

}

var s = http.createServer(handle_incoming_request);
s.listen(8080);

