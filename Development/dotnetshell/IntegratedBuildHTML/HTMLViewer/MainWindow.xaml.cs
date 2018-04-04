using CefSharp;
using Microsoft.AspNet.SignalR.Client;
using Microsoft.Owin.Cors;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
using Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace HTMLViewer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        IHubProxy alphaProxy;

        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {

            var settings = new CefSettings { RemoteDebuggingPort = 8088 };
            browser.ShowDevTools();
            //Cef.Initialize(settings);
                                                                                                                                            
            var url = "http://localhost:8082";
            var fileSystem = new PhysicalFileSystem("dist");
            

            var options = new FileServerOptions();
            options.EnableDirectoryBrowsing = true;
            options.FileSystem = fileSystem;
            options.StaticFileOptions.ServeUnknownFileTypes = true;
            //options.StaticFileOptions.ContentTypeProvider = new CustomContentTypeProvider();

            WebApp.Start(url, builder => builder.UseFileServer(options).MapSignalR().UseCors(CorsOptions.AllowAll));
            //browser.Load("http://localhost:8082/dist/SignalR.html");
            browser.Load("http://localhost:8082/index.html");

            await Task.Delay(5000);


            var hubConnection = new HubConnection("http://localhost:8082/signalr", useDefaultUrl: false);
            alphaProxy = hubConnection.CreateHubProxy("HTMLPlayerHub");

            await hubConnection.Start();

            //await alphaProxy.Invoke("Hey", "Message from Service", " ");

            //$change here
            /*await alphaProxy.Invoke("PushJson", "{sessionId: 'jkdfjddfk43243kjfkj', homePath: 'C:\\Users\\sevya-2\\Downloads\',"+
                                        "files: [{'segmentId': 123, 'file': '\\abc.swf','startAt': '00:00'," +
                                        "}, {'segmentId': 124, 'file': '\\xyz.swf'}]}");*/
            //await alphaProxy.Invoke("PushJson", "{sessionId: 'jkdfjddfk43243kjfkj', homePath: 'C:\\Users\\sevya-2\\Downloads',files: [{'segmentId': 123,'file': '/home/play/:1'},{'segmentId': 124,'file': '/home/about/:2'},{'segmentId': 125,'file': '/home/load'},{'segmentId': 126,'file': '/home/load1'}]}");

            
        }

        private void Window_Closed(object sender, EventArgs e)
        {
            browser.Dispose();
            Cef.Shutdown();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            alphaProxy.Invoke("pauseCalled");
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            alphaProxy.Invoke("playCalled");
        }
    }
}
