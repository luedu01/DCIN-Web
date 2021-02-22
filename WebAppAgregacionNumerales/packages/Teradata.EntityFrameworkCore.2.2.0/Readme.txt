Copyright (c) 2019-2020 Teradata Corporation. All rights reserved.

--------------------------------------------------------------------------------
                    Teradata Entity Framework Core Provider
                                 Version 2.2.0
--------------------------------------------------------------------------------

Send feedback to: FN230017@teradata.com


RELEASE NOTES


Content:

1.0 Overview
1.1   New Features
1.2   Problems Fixed
2.0 Product Dependencies
3.0 Operating Environments
4.0 Installation
5.0 Features and Limitations
5.1   Modeling Limitations
5.2   Query Limitations
5.3   Migrations Limitations
5.4   Scaffolding Limitations
6.0 Sample C# Code



1.0 Overview
============
The Teradata Entity Framework Core Provider ("EFCore Provider") is an 
implementation of a database provider for Microsoft Entity Framework Core v2.2
("EFCore"). It allows EFCore applications to load data into or retrieve data 
from the Teradata Database or Teradata Advanced SQL Engine.


1.1 New Features
================
Version 2.2.0:
- Added support for spatial data (Geospatial) with the
  Teradata.EntityFrameworkCore.NetTopologySuite package.

Version 0.6.0:
- Added support for Migrations.
- Renamed UseTeradataIdentityAlways to ForTeradataUseIdentityAlways and 
  UseTeradataIdentityByDefault to  ForTeradataUseIdentityByDefault.
- Added support for schemas.
- Added new ModelBuilder and EntityTypeBuilder extensions.
- Added the ForTeradataUseRowVersion extension to support the 
  RowVersion/Timestamp feature.

Version 0.5.0-alpha1:
- First release.


1.2 Problems Fixed
==================
Version 0.6.0:
- Moved the Teradata DbFunction extension methods to the 
  Teradata.EntityFrameworkCore namespace.


2.0 Product Dependencies
========================
The EFCore Provider depends on the following packages:
    Teradata.Client.Provider version 16.20.9 or later
    Microsoft.EntityFrameworkCore.Relational version 2.2.6


3.0 Operating Environments
===========================
The following operating environments are supported:

Client Operating Environment:
    Microsoft .NET Core 2.2 on Windows, Linux, and macOS
                    
The EFCore Provider supports the following Teradata Database or Teradata 
Advanced SQL Engine Releases:
    16.10
    16.20
        
This release of EFCore Provider is not compatible with Entity Framework, Entity
Framework Core 1.x or Entity Framework Core 3.x.

The EFCore Provider architecture is MSIL. Therefore a single installation 
supports 32-bit and 64-bit applications.


4.0 Installation
================
This product is provided as a NuGet package only and may be installed or 
uninstalled using a NuGet package manager.


5.0 Features and Limitations
============================
The following DbContextOptionsBuilder extension is provided:
- UseTeradata: Configures the context to connect to a Teradata SQL Engine.

The following ModelBuilder extensions are provided to configure the model:
- ForTeradataUseIdentityByDefault: Configures the model to use the Teradata 
  Identity Column feature to generate values BY DEFAULT for key properties 
  marked as ValueGenerated.OnAdd. This is the default behavior when targeting 
  Teradata SQL Engine.
- ForTeradataUseIdentityAlways: Configures the model to use the Teradata 
  Identity Column feature to generate values ALWAYS for key properties 
  marked as ValueGenerated.OnAdd.

The following ModelBuilder extensions are provided to configure the default 
database object in which the model may be stored:
- ForTeradataUseStorageOptions: Configures the storage options for the 
  database object in which the model is stored. The parameter accepts a string
  that should contain the desired storage options in the following format:
  "PERM = ...[ SPOOL = ...][ TEMPORARY = ...]".

  NOTE: The storage options string is required if the default database does not
  exist.
- ForTeradataUseFallbackProtection: Configures the Fallback Protection for the 
  database object in which the model is stored. If the value is true, Fallback
  Protection will be enabled. If the value is false, Fallback Protection will 
  be disabled. Fallback Protection is disabled by default.
- ForTeradataUseAccountString: Configures the Account String for the database
  object in which the model is stored.
- ForTeradataUseBeforeJournal, ForTeradataUseAfterJournal, and 
  ForTeradataUseDefaultJournalTable: Configures the Before and After Journal 
  and the default journal table for the database object in which the model 
  is stored.

The following ModelBuilder extensions are provided to configure any schema 
objects in which the model may be stored (see section 5.3 for more information
about schemas):
- ForTeradataSchemaUseStorageOptions: Configures the storage options for the 
  database object in which the schema is stored. The parameter accepts a string
  that should contain the desired storage options in the following format:
  "PERM = ...[ SPOOL = ...][ TEMPORARY = ...]".

  NOTE: The storage options string is required to create the database object 
  in which the schema is stored.
- ForTeradataSchemaUseFallbackProtection: Configures the Fallback Protection 
  for the database object in which the schema is stored. If the value is true,
  Fallback Protection will be enabled. If the value is false, Fallback 
  Protection will be disabled. Fallback Protection is disabled by default.
- ForTeradataSchemaUseAccountString: Configures the Account String for the 
  database object in which the schema is stored.
- ForTeradataSchemaUseBeforeJournal, ForTeradataSchemaUseAfterJournal, and 
  ForTeradataSchemaUseDefaultJournalTable: Configures the Before and After 
  Journal and the default journal table for the database object in which the 
  schema is stored.

The following EntityTypeBuilder extensions are provided:
- ForTeradataAllowDuplicates: Configures the table kind for the table object 
  that the entity maps to. If the value is true, a MULTISET table is created. 
  If the value is false, a SET table is created. By default, the table kind 
  depends on the Session Mode: MULTISET in ANSI, SET in Teradata. The table 
  kind cannot be modified using migrations after the table is created.
- ForTeradataUseFallbackProtection: Configures the Fallback Protection for the 
  table object that the entity maps to. If the value is true, Fallback 
  Protection will be enabled. If the value is false, Fallback Protection will 
  be disabled. By default, Fallback Protection is inherited from the Model.
- ForTeradataUseBeforeJournal, ForTeradataUseAfterJournal, and 
  ForTeradataUseJournalTable: Configures the Before and After Journal and the
  journal table for the table object that the entity maps to.

The following PropertyBuilder extensions are provided:
- ForTeradataUseIdentityByDefault: Configures the key property to use the 
  Teradata Identity Column feature to generate values BY DEFAULT for new 
  entities. This method sets the property to be ValueGenerated.OnAdd.
- ForTeradataUseIdentityAlways: Configures the key property to use the 
  Teradata Identity Column feature to generate values ALWAYS for new 
  entities. This method sets the property to be ValueGenerated.OnAdd.
- ForTeradataUseRowVersion: Configures the property to emulate the
  RowVersion/Timestamp feature using triggers. This extension must be used
  instead of the IsRowVersion() Fluent API or [Timestamp] attribute, which
  are not supported.
- ForTeradataIsCaseSensitive: Sets case sensitivity for a character 
  property.


5.1 Modeling Limitations
========================
The following EFCore concepts are not supported by the Teradata SQL Engine:
- Computed columns.
- Identity Column as part of a composite key.
- Sequences. The EFCore Provider supports Identity Columns with the provided 
  ForTeradataUseIdentityAlways and ForTeradataUseIdentityByDefault extensions.
- ROWVERSION columns or [Timestamp] attribute. Application must instead 
  configure a property using the ForTeradataUseRowVersion extension to enable
  optimistic concurrency control.
- Guid data type. As a workaround, a Guid property may be mapped to a 
  VARBYTE(16) or a VARCHAR(36) column. A Guid-to-string or Guid-to-bytes value
  converter must also be configured for the property.
- The Teradata SQL Engine does not have a default length for array data types.
  Any properties of type string, char[], or byte[] must either be mapped to a
  BLOB or a CLOB column or have the maximum length specified via Maximum Length
  or Column Type data annotations. NOTE: Maximum Length and Column Type are 
  mutually exclusive.

The following concepts are not supported by the EFCore Provider:
- User-defined types (UDT)
- User-defined functions (UDF)


5.2 Query Limitations
=====================
The following query limitations exist:
- The FromSql extension method does not support "CREATE/REPLACE PROCEDURE" -- 
  call the TdCommand.ExecuteCreateProcedure method instead.
- The FromSql extension method supports named and positional parameters, but 
  named parameters may not be re-used -- every parameter in the RawSqlString 
  must have a unique name.
- The LINQ Skip(n) method is not supported if it's not executed locally.
- The String == operator and String.Compare(String) methods are not case-
  sensitive in Teradata session transaction mode and are case-sensitive in ANSI
  session transaction mode. The String.Compare(strA, strB, ignoreCase) method 
  may be used to specify desired behavior without regard for transaction mode. 
  The ForTeradataIsCaseSensitive extension may be used to specify case 
  sensitivity of a property.
- The Teradata SQL Engine does not allow deleting rows if doing so violates 
  referential constraints.
- The Teradata SQL Engine does not support cascade delete.
- When column name and alias names are the same, the SQL Engine references the 
  column name, not the alias name for operations like "ORDER BY". This may not 
  result in exceptions, but may lead to incorrect results.
- Conversion of System.DateTimeOffset and System.TimeSpan to System.String 
  using object.ToString() or Convert.ToString(object) method will always be
  performed on the client, because there is no native Convert.ToString() method
  for either type.

Teradata Database does not support queries if they contain:
- "ORDER BY" in a subquery, such as: 
  os => os.OrderBy(o => o.OrderID).Select(o => o.OrderID).Take(10).Max()
- Parametrized "CASE WHEN", which may be generated when using the LINQ 
  Contains() method.
- Parametrized "TOP N" (i.e. "TOP ?"), if the object for parameter N is not a
  ConstantExpression.
- "TOP N" in a subquery. The LINQ methods Take(n), First(), FirstOrDefault()
  are not supported in subqueries.
- "TOP N" with DISTINCT option, such as: os.Distinct().Take(n)
- References to outer alias from a derived table or to outer query objects from
  a subquery. The EFCore Provider does not detect this condition -- the Data 
  Provider will throw a TdException with error number 3807 ("Object does not 
  exist").


5.3 Migrations Limitations
==========================
The Teradata SQL Engine does not support the relational database concept of
"schema" and only supports a two-part naming convention for qualified object 
names (i.e., "DatabaseName.TableName", not "catalog.schema.table"). However, 
a schema may be considered functionally equivalent to a database object in the
Teradata SQL Engine. Therefore, schemas are mapped to database objects by the 
Teradata EFCore Provider. ModelBuilder extensions described in section 5.0 are 
provided to annotate such database objects appropriately.

The EnsureSchema migration operation is supposed to only create the schema if
it does not already exist. Due to limitations of the SQL Engine, this operation
requires the use of a stored procedure. A procedure named 
"__EFEnsureSchemaProc" is created in the default database automatically during
the initial migration for this purpose. This procedure is only required for 
Migrations with schemas and may be dropped manually if it is no longer needed.


5.4 Scaffolding Limitations
===========================
- When providing both, a list of schemas and a list of tables for scaffolding,
  if any of the tables in the list are not schema-qualified, scaffolding will 
  search for these tables in the default database.
- A RowVersion column cannot be scaffolded, since the SQL Engine does not have
  support for this feature.


6.0 Sample C# Code
==================

using System;
using Microsoft.EntityFrameworkCore;

namespace Teradata.EntityFrameworkCore.Example
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Url { get; set; }
    }

    public class BloggingContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // TODO: set appropriate ConnectionString options for your Data Source
            // Note: the Default Database is required.
            optionsBuilder.UseTeradata("Data Source=MYTERADATADATABASE;" +
                "User Id=BlogUser;Password=BlogPassword;Database=BloggingDatabase");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Required due to a Modeling Limitation described above
            modelBuilder.Entity<Blog>().Property(e => e.Url).HasColumnType("VARCHAR(2048)");

            // TODO: Annotate the model with desired database object properties
            modelBuilder.ForTeradataUseStorageOptions("PERM = 1E7*(HASHAMP()+1)");
        }
    }

    public class Program
    {
        public static void Main()
        {
            using (var db = new BloggingContext())
            {
                // TODO: use Migrations or db.Database.EnsureCreated() to create database and tables
                db.Database.EnsureCreated();

                Blog[] localData = new[]
                {
                    new Blog { Url = "https://blogs1.example.com" },
                    new Blog { Url = "https://blogs2.example.com" },
                };

                db.Blogs.AddRange(localData);
                Console.WriteLine($"{db.SaveChanges()} records saved to database.\n");

                Console.WriteLine("Local data after SaveChanges():");
                foreach (Blog blog in localData)
                {
                    Console.WriteLine($"  {blog.BlogId} - {blog.Url}");
                }

                db.Blogs.RemoveRange(localData);
                Console.WriteLine($"\n{db.SaveChanges()} records removed from database.");
            }
        }
    }
}