Copyright (c) 2005-2019 Teradata Corporation. All rights reserved.

--------------------------------------------------------------------------------
                     .NET Data Provider for Teradata               
                              Version 16.10.2
--------------------------------------------------------------------------------

********************************************************************************
****  NOTE: The Data Provider requires .NET FRAMEWORK 4.5.2 or higher.      ****
****        It does not support .NET Framework 3.5, 4.0, 4.5 or 4.5.1       ****
********************************************************************************

********************************************************************************
****  NOTE: The connection string attribute UseEnhancedSchemaTable has      ****
****        been deprecated. It may be removed in a future release.         ****
********************************************************************************


RELEASE NOTES


Content:

1.0 Overview
1.1   New Features
1.2   Problems Fixed
2.0 Teradata Product Dependencies
3.0 Operating Environments
4.0 Installation
4.1   Installation Procedure
4.2   Installation Options
5.0 Uninstall
6.0 Restrictions and Known Issues



1.0 Overview
============
The .NET Data Provider for Teradata is an implementation of the Microsoft 
ADO.NET specification. It provides direct access to the Teradata Database 
and integrates with the DataSet. .NET Applications use the .NET Data Provider
for Teradata to load data into the Teradata Database or retrieve data from
the Teradata Database. 

.NET Data Provider for Teradata is also an ADO.NET Entity Framework Provider 
with support for the Entity Data Model (EDM), LINQ-to-Entities and Entity-SQL. 

See following links for additional information:
 a) ADO.NET Overview: 
        http://msdn.microsoft.com/en-us/library/h43ks021.aspx

 b) ADO.NET Entity Framework: 
        http://msdn.microsoft.com/en-us/library/bb399572.aspx


********************************************************************************
****  NOTE: The Data Provider requires .NET FRAMEWORK 4.5.2 or higher.      ****
****        It no longer supports .NET Framework 3.5, 4.0, 4.5 or 4.5.1     ****
********************************************************************************



1.1 New Features
================
Version 16.10:
  a) The Data Provider does not perform Code Access Security Link Demands. Two
     instance of Link Demand were removed from the TdQueryBand and TdException
     classes [NET-3962].

  b) A new Statistics schema collection has been added to provide information
     on data distribution within tables [NET-91].

  c) It is no longer required to create mapping tables for Views and ViewColumns
     in order to use the Entity Framework Store Schemas. However better performance
     will be attained if the mappings are created [NET-3802].

Version 16.0:
  a) The Data Provider supports TDNEGO authentication mechanism in addition to
     LDAP, TD2 and SPNEGO. [NET-3246]

  b) The Data Provider supports the following ADO.NET 4.5 Asynchronous methods:
         1- TdDataReader.ReadAsync
         2- TdDataReader.NextResultAsync
         3- TdDataReader.GetFieldValueAsync<T>  [NET-3484 / NET-3655]
         4- TdCommand.ExecuteNonQueryAsync
         5- TdCommand.ExecuteReaderAsync
         6- TdCommand.ExecuteScalarAsync        [NET-3483]
         7- TdConnection.OpenAsync              [NET-3385]

  c) The Data Provider supports the following ADO.NET 4.5 Streaming methods:
         1- TdDataReader.GetFieldValue<T>
         2- TdDataReader.GetStream    
         3- TdDataReader.GetTextReader
         4- TdDataReader.GetXmlReader           [NET-2481]

  d) TdDataReader.GetSchemaTable() method has been enhanced by adding a new DataColumn
     for ServerType. This field is populated only when the column is a DATASET data type.
     The data for a Dataset column will be transferred to/from Teradata as a BLOB or
     VarByte value depending on the transform that is currently in effect for the user. [NET-3480]

  e) The Schema Collections have been enhanced as follows [NET-3707]:

     1- Support has been added for the new DATASET STORAGE FORMAT AVRO data type and
        for the new AVRO SCHEMA object type.

     2- Support has been added for the new INLINE LENGTH attribute that can be applied
        to columns and parameters of the following data types:
           JSON, XML, ST_GEOMETRY and DATASET.

     3- The Columns collection has been enhanced to return the following additional
        columns: STORAGE_FORMAT, INLINE_LENGTH and DATASET_SCHEMA

     4- The ProcedureParameters and UserDefinedFunctionParameters collections have 
        been enhanced to return the following additional columns:
            STORAGE_FORMAT and INLINE_LENGTH

  f) Support the new 1MB response rows and 16MB messages in Teradata Database 16.0.
     The Data Provider now supports an internal buffer size of up to 16MB.
     This value can be set through the TdConnection.ResponseBufferSize property.[NET-3482]


1.2 Problems Fixed
==================
Version 16.10.2:
  a) The Data Provider successfully returns a Connection from a Pool when 
     TdConnection.OpenAsync method is used to retrieve an idle Connection. The 
     Data Provider no longer throws "[100002] Cannot create connection within 
     the time specified". [NET-4645] 

Version 16.10.1:
  a) The Data Provider will no longer attempt to use the DBC.ColumnsJQV view,
     when fetching the Columns Schema Collection, if the Teradata Database QVCI
     feature is disabled. [NET-4210]

  b) Large batch sizes will no longer return Database Error 9993 when using
     the Update() method of a TdDataAdapter to insert, or update, rows on a
     Teradata 16.10 or 16.20 system. [NET-4254]

Version 16.10:
  a) The Data Provider now supports TCP Receive Window Auto-Tuning feature 
     [NET-3947].
 
  b) The correct error message will now be displayed if a Timeout occurs
     during a batch update operation [NET-3797].

Version 16.0.0.1:
  a) Silent Install uninstalled the previous version of the Data Provider.
     In other words, Silent Install did not support Side-by-Side Installation 
     of two or more versions of the Data Provider. This issue has been fixed 
     [CLNTINS-7280].
      
Version 16.0:

  a) The Data Provider did not calculate the buffer size correctly which resulted
     in an additional request being sent to the Teradata Database for each Batch.
     This issue has been fixed. [NET-3592]


  b) If a Period column contained a null value in the first row of a batch the Precision
     and Scale were set to zero. The result was that any fractional seconds were truncated.
     This issue has been fixed. [NET-3417]


       
2.0 Teradata Product Dependencies
=================================
The Data Provider communicates directly to the Teradata Database. There are no 
dependencies on any of the Teradata Tools and Utilities products.


3.0 Operating Environments
===========================
The following operating environments are supported:

Client Operating Systems:
    Microsoft Windows 7               x86 & x64 Editions
    Microsoft Windows 8               x86 & x64 Editions
    Microsoft Windows 8.1             x86 & x64 Editions
    Microsoft Windows 10              x86 & x64 Editions
    Microsoft Windows Server 2008     x86 & x64 Editions
    Microsoft Windows Server 2008 R2
    Microsoft Windows Server 2012 
    Microsoft Windows Server 2012 R2 

Client Operating Environment:
    Microsoft .NET Framework 4.5.2    x86 & x64 (CLR 4.0)
    Microsoft .NET Framework 4.6      x86 & x64 (CLR 4.0)
    Microsoft .NET Framework 4.6.1    x86 & x64 (CLR 4.0)
                    
Microsoft Visual Studio:
    2012 Professional Edition or higher edition
    2013 Professional Edition or higher edition
    2015 Professional Edition or higher edition

The .NET Data Provider for Teradata and .NET Entity Provider for Teradata 
support the following Teradata Database Releases:
    14.0
    14.10
    15.0
    15.10
    16.10
        
              
The .NET Entity Provider for Teradata supports ADO.NET Entity Framework 3.5 SP1
features. It does not support ADO.NET Entity Framework 4.0 (or higher) features.

The .NET Data Provider for Teradata architecture is MSIL. Therefore a 
single installation supports 32-bit and 64-bit applications.


4.0 Installation
================
For step-by-step Installation Instructions refer to "Teradata Tools and 
Utilities Installation Guide for Microsoft Windows" document on 
http://www.info.teradata.com. Navigate to General Search and use 
Publication Product ID 2407 to locate the document.



4.1 Installation Procedure
==========================
The .NET Data Provider for Teradata is dependent on the Microsoft .NET Framework
version 4.5.2. It can be downloaded from: 
    https://www.microsoft.com/net/download

*** RECOMMENDATION: Uninstall previous version(s) of the .NET Data Provider
for Teradata if there is no application dependency (for additional information
see Section 6.0 Item e).

In the following instructions, the "installation executable" refers to the 
the file:

     tdnetdp__windows_indep.16.10.02.00.exe

NOTE:
      The name of the installation package obtained when performing 
      a Network Install from the TTU media is setup.exe.   


Any reference to the .NET Data Provider for Teradata or the Teradata Provider
refers to

     .NET Data Provider for Teradata 16.10.2.0

Follow this procedure to install the Data Provider:

   1- Run installation executable.   (See NOTE below.)
   
   2- In the Choose Setup Language dialog, select the Language you want to use
      and click OK.
      
   3- When the Welcome screen appears, click Next>.
   
   4- In the Choose Destination folder dialog, choose a destination folder 
      and click Next>.

   5- In the Setup Type dialog, choose either complete or custom setup type
      and click Next>. Choosing 'complete' setup type would select all the 
      features for installation whereas choosing 'custom' setup type allows 
      the user to select features for installation.

   6- In the Custom setup dialog, click Next> to accept the defaults. 
      The "Integrate the Data Provider with Microsoft Visual Studio(s)" feature 
      is visible when any of the Microsoft Visual Studio versions supported by
      this version of the .NET Data Provider for Teradata is installed. 
      
   7- In the Ready to install dialog, click on 'Install' to start the package 
      installation. If Visual studio features are selected then this step will 
      take several minutes to complete.      
 
   8- In the InstallShield Wizard Complete screen, click Finish.   
   

4.2 Installation options
=========================
Interactive install:
   Double click installation executable to start the installation or Run 
   the installation executable from command prompt and go through the dialog 
   sequence.


Silent install:
  From command prompt:   
    To install the full package specify the installation executable with the
    following default default options:

       /s /v"/qn"   

    To install to a user defined location run specify the following options:

       /s /v"/qn INSTALLDIR=c:\test"

    To install the package without Visual Studio features use the options:

       /s /v"/qn VSFEATURE=0"    

NOTE:
   The self-extracting installation package, downloaded from the web
   (downloads.teradata.com), is not compatible with the SYSTEM account.
   The SETUP.EXE installation package, available on the Teradata Tools and
   Utilities media, must be used to deploy the Data Provider with the SYSTEM
   account.


Installation through SMS

   Extract the msi file from the installation executable by running the 
   following command at commmand prompt
   
        "installation executable" /a

   Using the extracted '.NET Data Provider for Teradata.msi' file the package 
   can be pushed from SMS server to SMS clients using the following commands:

   To install full package with defaults use
   msiexec /i ".NET Data Provider for Teradata.msi" /qn        

   To install to a user defined location use
   msiexec /i ".NET Data Provider for Teradata.msi" INSTALLDIR=c:\test /qn

   To install the package without Visual Studio features use
   msiexec /i ".NET Data Provider for Teradata.msi" VSFEATURE=0 /qn


5.0 Uninstall
=============
Follow this procedure to uninstall the .NET Data Provider for Teradata: 

  1- Open "Control Panel".

  2- Start "Add or Remove Programs".

  3- Find ".NET Data Provider for Teradata" and click Remove.
     This will uninstall the package.


6.0 Restrictions and Known Issues
=================================
a) The .NET Data Provider for Teradata requires Full-Trust permission-set to 
   run. 

b) TableAdapter Query Configuration Wizard, in Microsoft Visual Studio 2008, 
   does not generate correct Parameters for INSERT Query Type. This is a known
   Visual Studio 2008 limitation. See incident number 331845 at 
   http://connect.microsoft.com/VisualStudio.

c) The process of uninstalling the .NET Data Provider version 14.11
   while .NET Data Provider 15.01 is also installed, will remove the
   registry keys for Visual Studio 2008. Please use the Maintenance 
   Dialog Box (Launch Add/Remove Programs from the Control Panel and 
   select Change) to "Repair" the .NET Data Provider 15.01 integration with 
   Visual Studio.
   
d) The Contents pane of the Microsoft Help Viewer version 1.1 displays the 
   ".NET Data Provider for Teradata" node when the Installation successfully 
   registers the Data Provider's "Help" with the Visual Studio 2010. Please refer 
   to "Visual Studio 2010 Help Installation" section of the standalone Help 
   (tdnetdp.chm file in "<Installation Directory>\Help" directory) to manually 
   register/integrate the Help into Visual Studio 2010 if 
   ".NET Data Provider for Teradata" is not visible in the Contents pane.