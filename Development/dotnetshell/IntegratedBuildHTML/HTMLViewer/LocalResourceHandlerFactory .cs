using CefSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HTMLViewer
{
    public class LocalResourceHandlerFactory : IResourceHandlerFactory
    {
        public bool HasHandlers
        {
            get
            {
                return true;
            }
        }

        public IResourceHandler GetResourceHandler(IWebBrowser browserControl, IBrowser browser, IFrame frame, IRequest request)
        {
            return new LocalResourceHandler();
        }
    }
}
