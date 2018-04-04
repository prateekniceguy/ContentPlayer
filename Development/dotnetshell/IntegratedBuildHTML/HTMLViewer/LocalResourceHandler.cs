using CefSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HTMLViewer
{
    class LocalResourceHandler : IResourceHandler
    {
        private string mimeType;
        private MemoryStream stream;

        public void Cancel()
        {

        }

        public bool CanGetCookie(Cookie cookie)
        {
            return true;
        }

        public bool CanSetCookie(Cookie cookie)
        {
            return true;
        }

        public void Dispose()
        {

        }

        public void GetResponseHeaders(IResponse response, out long responseLength, out string redirectUrl)
        {
            responseLength = stream == null ? 0 : stream.Length;
            redirectUrl = null;

            response.StatusCode = (int)System.Net.HttpStatusCode.OK;
            response.StatusText = "OK";
            response.MimeType = mimeType;
        }

        public bool ProcessRequest(IRequest request, ICallback callback)
        {
            // The 'host' portion is entirely ignored by this scheme handler.
            var uri = new Uri(request.Url);
            var file = uri.AbsolutePath;

            if (File.Exists(file))
            {
                Byte[] bytes = File.ReadAllBytes(file);
                stream = new MemoryStream(bytes);
                switch (Path.GetExtension(file))
                {
                    case ".mp3":
                        mimeType = "audio/mpeg";
                        break;
                    case ".ogv":
                        mimeType = "video/ogg";
                        break;
                    case ".html":
                    case ".htm":
                        mimeType = "text/html";
                        break;
                    case ".css":
                        mimeType = "text/css";
                        break;
                    case ".js":
                        mimeType = "text/javascript";
                        break;
                    case ".png":
                        mimeType = "image/png";
                        break;
                    case ".jpg":
                    case ".jpeg":
                        mimeType = "image/jpeg";
                        break;
                    case ".gif":
                        mimeType = "image/gif";
                        break;
                    case ".woff":
                        mimeType = "application/font-woff";
                        break;
                    case ".eot":
                        mimeType = "application/vnd.ms-fontobject";
                        break;
                    case ".ttf":
                        mimeType = "application/font-ttf";
                        break;
                    case ".otf":
                        mimeType = "application/font-otf";
                        break;
                    case ".svg":
                        mimeType = "image/svg+xml";
                        break;
                    case ".appcache":
                    case ".manifest":
                        mimeType = "text/cache-manifest";
                        break;
                    default:
                        mimeType = "application/octet-stream";
                        break;
                }
                callback.Continue();
                return true;
            }
            return false;
        }

        public bool ReadResponse(Stream dataOut, out int bytesRead, ICallback callback)
        {
            //Dispose the callback as it's an unmanaged resource, we don't need it in this case
            callback.Dispose();

            if (stream == null)
            {
                bytesRead = 0;
                return false;
            }

            //Data out represents an underlying buffer (typically 32kb in size).
            var buffer = new byte[dataOut.Length];
            bytesRead = stream.Read(buffer, 0, buffer.Length);

            dataOut.Write(buffer, 0, buffer.Length);

            return bytesRead > 0;
        }
    }
}
