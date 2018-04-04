using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HTMLViewer
{
    [HubName("HTMLPlayerHub")]
    public class HTMLPlayerHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.addMessage(name, message);
        }

        public void Hey(string name, string message)
        {
            Clients.All.Hey(name, message);
        }
        //$change here
        public void playerReady()
        {
            //string json = "{files:[{\"segmentId\": 123,\"file\": \"assets/content1/\"},{\"segmentId\": 124,\"file\": \"assets/content2/\"},{\"segmentId\": 125,\"file\": \"assets/content3/\"},{\"segmentId\": 126,\"file\": \"assets/content4/\"},{\"segmentId\": 127,\"file\": \"assets/content5/\"}]}";
            //string json = "{\"homePath\": \"home\",\"playerPreview\": false, \"files\":[{\"startAt\": 45,\"segmentId\": 123,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 15,\"segmentId\": 124,\"file\":\"http://localhost:8080/content2/\"},{\"startAt\": 13,\"segmentId\": 125,\"file\": \"http://localhost:8080/content3/\"},{\"startAt\": 19,\"segmentId\": 126,\"file\": \"http://localhost:8080/content4/\"},{\"startAt\": 10,\"segmentId\": 127,\"file\": \"http://localhost:8080/content5/\"}]}";
            //string json = "{\"homePath\": \"home\",\"playerPreview\": true,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 123,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 70,\"segmentId\": 120,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content2/\"},{\"startAt\": 15,\"segmentId\": 124,\"file\":\"http://localhost:8080/content0/\"},{\"startAt\": 40,\"segmentId\": 125,\"file\": \"http://localhost:8080/content3/\"},{\"startAt\": 19,\"segmentId\": 126,\"file\": \"http://localhost:8080/content4/\"},{\"startAt\": 34,\"segmentId\": 127,\"file\": \"http://localhost:8080/content5/\"}]}";
            //string json = "{\"homePath\": \"home\",\"playerPreview\": false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 40,\"segmentId\": 123,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 70,\"segmentId\": 120,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content0/\"},{\"startAt\": 20,\"segmentId\": 120,\"file\": \"http://localhost:8080/content7/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/content9/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/content09/\"},{\"startAt\": 15,\"segmentId\": 124,\"file\":\"http://localhost:8080/content2/\"},{\"startAt\": 19,\"segmentId\": 130,\"file\": \"http://localhost:8080/content01/\"},{\"startAt\": 25,\"segmentId\": 132,\"file\": \"http://localhost:8080/content01_dup/\"},{\"startAt\": 2,\"segmentId\": 134,\"file\": \"http://localhost:8080/content03/\"},{\"startAt\": 9,\"segmentId\": 138,\"file\": \"http://localhost:8080/content03_dup/\"},{\"startAt\": 40,\"segmentId\": 125,\"file\": \"http://localhost:8080/content3/\"},{\"startAt\": 40,\"segmentId\": 126,\"file\": \"http://localhost:8080/content4/\"}]}";
            //tempstring json = "{\"homePath\":\"home\",\"playerPreview\":true,\"sessionId\":\"3db0f690 - ced8 - 452d - a94f - 05ebb1efbd33\",\"files\":[{\"segmentId\":\"5\",\"file\":\"http://localhost:8080/2017_07_31_12_55_12_489_PM_content2/content2/\",\"startAt\":\"0\"},{\"segmentId\":\"6\",\"file\":\"http://localhost:8080/2017_07_31_12_55_42_335_PM_content3/content4/\",\"startAt\":\"0\"},{\"segmentId\":\"8\",\"file\":\"http://localhost:8080/2017_07_31_12_55_31_606_PM_content4/content3/\",\"startAt\":\"0\"}]}";
            //string json = "{\"homePath\": \"home\",\"playerPreview\": false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 70,\"segmentId\": 122,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 20,\"segmentId\": 120,\"file\": \"http://localhost:8080/content7/\"},{\"startAt\": 40,\"segmentId\": 180,\"file\": \"http://localhost:8080/content8/\"},{\"startAt\": 19,\"segmentId\": 130,\"file\": \"http://localhost:8080/content01/\"},{\"startAt\": 20,\"segmentId\": 150,\"file\": \"http://localhost:8080/content7_dup/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content0/\"},{\"startAt\": 25,\"segmentId\": 132,\"file\": \"http://localhost:8080/content01_dup/\"},{\"startAt\": 2,\"segmentId\": 134,\"file\": \"http://localhost:8080/content03/\"},{\"startAt\": 15,\"segmentId\": 125,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 40,\"segmentId\": 188,\"file\": \"http://localhost:8080/content08/\"},{\"startAt\": 9,\"segmentId\": 138,\"file\": \"http://localhost:8080/content03_dup/\"}]}";
            //string json = "{\"homePath\": \"home\",\"playerPreview\": true,\"forwardEnabled\":false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 5,\"segmentId\": 125,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content0/\"},{\"startAt\": 40,\"segmentId\": 180,\"file\": \"http://localhost:8080/content8/\"},{\"startAt\": 40,\"segmentId\": 188,\"file\": \"http://localhost:8080/content08/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/content9/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/content09/\"},{\"startAt\": 0,\"segmentId\": 120,\"file\": \"http://localhost:8080/content7/\"},{\"startAt\": 0,\"segmentId\": 150,\"file\": \"http://localhost:8080/content7_dup/\"},{\"startAt\": 19,\"segmentId\": 130,\"file\": \"http://localhost:8080/content01/\"},{\"startAt\": 25,\"segmentId\": 132,\"file\": \"http://localhost:8080/content01_dup/\"},{\"startAt\": 2,\"segmentId\": 134,\"file\": \"http://localhost:8080/content03/\"},{\"startAt\": 9,\"segmentId\": 138,\"file\": \"http://localhost:8080/content03_dup/\"}]}";
            string json = "{\"homePath\": \"home\",\"forwardEnabled\": true,\"playerPreview\": false,\"sessionId\":\"kdfjddfk43243kjfkj\",\"files\":[{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content1/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/tempeleven/\"},{\"startAt\": 19,\"segmentId\": 130,\"file\": \"http://localhost:8080/content01/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content00/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content11d1act4/\"},{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content0/\"},{\"startAt\": 0,\"segmentId\": 199,\"file\": \"http://localhost:8080/content1d2act1/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/content9/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/content09/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/contentact4/\"},{\"startAt\": 19,\"segmentId\": 147,\"file\": \"http://localhost:8080/contentact5/\"},{\"startAt\": 19,\"segmentId\": 146,\"file\": \"http://localhost:8080/contentact6/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content11d3act2/\"},{\"startAt\": 0,\"segmentId\": 211,\"file\": \"http://localhost:8080/content11d3act3/\"},{\"startAt\": 0,\"segmentId\": 140,\"file\": \"http://localhost:8080/content00_1/\"},{\"startAt\": 12,\"segmentId\": 128,\"file\": \"http://localhost:8080/content00_2/\"}]}";

            Clients.All.open(json);
        }
        //$change here
        public void eventFromPlayer(string sjson)
        {
            //msgBoxDisplay(sjson);
            if (sjson.IndexOf("play") > 0)
            {
                //msgBoxDisplay(sjson);
                //Clients.All.cmsPlayerPlay();
                //Clients.All.cmsPlayerPause();
                //Clients.All.cmsPlayerClose();

            } else if (sjson.IndexOf("pause") > 0)
            {
                //msgBoxDisplay(sjson);
                //Clients.All.cmsPlayerPlay();
                //Clients.All.cmsPlayerPause();
                //Clients.All.cmsPlayerClose();
                

            } else if(sjson.IndexOf("segmentBegins") > 0)
            {
                //msgBoxDisplay("pausing");
                //var timer1 = new Timer(_ => Clients.All.cmsPlayerPlay(), null, 0, 2500);
            }
            if (sjson.IndexOf("exit") > 0)
            {
                //msgBoxDisplay(sjson);
            }
        }

        public void pauseCalled()
        {
            Clients.All.cmsPlayerPause();
        }

        public void playCalled()
        {
            Clients.All.cmsPlayerPlay();
        }

        public void TimeoutHandler()
        {
            Clients.All.cmsPlayerPause();
        }

        public void PushJson(string json)
        {
            //Clients.All.AppComponent.open(json);
            //Clients.All.pushJson(json);
            //$change here
            Clients.All.open(json);
        }

        public void msgBoxDisplay(string dataToDisplay)
        {
            System.Windows.MessageBox.Show(dataToDisplay);
        }
    }
}

