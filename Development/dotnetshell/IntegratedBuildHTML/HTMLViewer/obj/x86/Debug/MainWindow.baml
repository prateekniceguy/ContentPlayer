   M S B A M L   `   `   `  ����T  PCefSharp.Wpf, Version=55.0.0.0, Culture=neutral, PublicKeyToken=40c4b6fc221f4138A0clr-namespace:CefSharp.Wpf;assembly=CefSharp.WpfCefSharp.Wpf  5   	   E AHTMLViewer, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:HTMLViewer
HTMLViewer 5   	      HTMLViewer.MainWindow   5   	   W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   EcefSharp0clr-namespace:CefSharp.Wpf;assembly=CefSharp.Wpf     5   	   *localclr-namespace:HTMLViewer     5   	   -   5          � Title$  
MainWindow��5	   	   $	��350��6   $	��525��6)    � WindowStartupLocation$ CenterScreen=�5
   	    � WindowState$ 	Maximized=�6E   .��5      �  � ColumnDefinitions 5   
   �� 5      $
��auto �6   6.   �� 5      $
��auto �6   6.   �� 5      $��* �6   6+    � RowDefinitions 5   
   �� 5      $
��auto �6   6,   �� 5      $��* �6   6)   .+�5   
   �� -   5        $��0��5      $��0��6   .��6C   pause6J   �� 5   
   -   5        $��0��5      $��1��6   .��6E   play6K   %   CefSharp.Wpf.ChromiumWebBrowser  5   
   -   5        $��browser��5   W   $��3��6&   $��1��6:   $��0��6G   6W   5      5      