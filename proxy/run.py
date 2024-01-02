import http.server
import socketserver
import urllib.request

class Proxy(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        url = f'http://localhost:9000{self.path}'
        print('url', url)
        self.send_response(200)
        self.end_headers()
        self.copyfile(urllib.request.urlopen(url), self.wfile)


PORT = 9001
httpd = None

try:
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(('', PORT), Proxy)
    print(f"Proxy at: http://localhost:{PORT}")
    httpd.serve_forever()
except KeyboardInterrupt:
    print("Pressed Ctrl+C")
finally:
    if httpd:
        httpd.shutdown()
        httpd.socket.close()
