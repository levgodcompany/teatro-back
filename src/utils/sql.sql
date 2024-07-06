
-- Tablas dimencionales
CREATE TABLE DimProducts (
    ID_Producto INT PRIMARY KEY,
    Producto VARCHAR(255) NOT NULL,
    ID_Marca INT,
    FOREIGN KEY (ID_Marca) REFERENCES DimMarcas(ID_Marca) 
);

CREATE TABLE DimMarcas (
    ID_Marca INT PRIMARY KEY,
    Marca: VARCHAR(255) NOT NULL,
    ID_Proveedor INT,
    FOREIGN KEY ID_Proveedor REFERENCES DimProveedorLogisticos(ID_Proveedor_Logistico)
);

CREATE TABLE DimProveedorLogisticos (
    ID_Proveedor_Logistico INT PRIMARY KEY,
    Proveedor_Logistico VARCHAR(255) NOT NULL,
    Latitud DECIMAL,
    Longitud: DECIMAL
);

CREATE TABLE DimVendedores (
    ID_Vendedor INT PRIMARY KEY,
    Nombre_Vendedor VARCHAR(255) NOT NULL,
    Apellido_Vendedor VARCHAR(255) NOT NULL,
    Fecha_Nacimineto DATE NOT NULL,
    ID_Region INT,
    FOREIGN KEY ID_Region REFERENCES DimRegiones(ID_Region)
);

CREATE TABLE DimRegiones (
    ID_Region INT PRIMARY KEY,
    Region VARCHAR(255) NOT NULL
);

CREATE TABLE DimClients (
    ID_Client INT PRIMARY KEY,
    Client VARCHAR(255) NOT NULL,
    ID_Region INT,
    FOREIGN KEY ID_Region REFERENCES DimRegiones(ID_Region)
);

-- Tablas de Hechos
CREATE TABLE FecVetas (
    ID_Transaccion INT PRIMARY KEY,
    ID_Producto INT,
    ID_Vendedor INT,
    ID_Cliente INT,
    Cantidad INT,
    Venta DECIMAL(10, 2),
    Costo DECIMAL(10, 2),
);

CREATE TABLE IntVenta_Facturas (
    ID_Int INT PRIMARY KEY,
    ID_Transaccion INT,
    ID_Factura INT,
    FOREIGN KEY ID_Transaccion REFERENCES FecVetas(ID_Transaccion)
    FOREIGN KEY ID_Factura REFERENCES FecFacturas(ID_Factura)
    
);

CREATE TABLE FecFacturas (
    ID_Factura INT PRIMARY KEY,
    Fecha_Envio DATE,
    Fecha_Venta Date
);


-- Tablas dimensionales

-- Tabla de productos, relacionada con la tabla de marcas a través de ID_Marca
CREATE TABLE DimProducts (
    ID_Producto INT PRIMARY KEY,
    Producto VARCHAR(255) NOT NULL,
    ID_Marca INT,
    FOREIGN KEY (ID_Marca) REFERENCES DimMarcas(ID_Marca) -- Relación de muchos a uno con DimMarcas
);

-- Tabla de marcas, relacionada con la tabla de proveedores logísticos a través de ID_Proveedor_Logistico
CREATE TABLE DimMarcas (
    ID_Marca INT PRIMARY KEY,
    Marca VARCHAR(255) NOT NULL,
    ID_Proveedor_Logistico INT,
    FOREIGN KEY (ID_Proveedor_Logistico) REFERENCES DimProveedorLogisticos(ID_Proveedor_Logistico) -- Relación de muchos a uno con DimProveedorLogisticos
);

-- Tabla de proveedores logísticos
CREATE TABLE DimProveedorLogisticos (
    ID_Proveedor_Logistico INT PRIMARY KEY,
    Proveedor_Logistico VARCHAR(255) NOT NULL,
    Latitud DECIMAL(9, 6),
    Longitud DECIMAL(9, 6)
);

-- Tabla de vendedores, relacionada con la tabla de regiones a través de ID_Region
CREATE TABLE DimVendedores (
    ID_Vendedor INT PRIMARY KEY,
    Nombre_Vendedor VARCHAR(255) NOT NULL,
    Apellido_Vendedor VARCHAR(255) NOT NULL,
    Fecha_Nacimiento DATE NOT NULL,
    ID_Region INT,
    FOREIGN KEY (ID_Region) REFERENCES DimRegiones(ID_Region) -- Relación de muchos a uno con DimRegiones
);

-- Tabla de regiones
CREATE TABLE DimRegiones (
    ID_Region INT PRIMARY KEY,
    Region VARCHAR(255) NOT NULL
);

-- Tabla de clientes, relacionada con la tabla de regiones a través de ID_Region
CREATE TABLE DimClientes (
    ID_Cliente INT PRIMARY KEY,
    Cliente VARCHAR(255) NOT NULL,
    ID_Region INT,
    FOREIGN KEY (ID_Region) REFERENCES DimRegiones(ID_Region) -- Relación de muchos a uno con DimRegiones
);

-- Tablas de hechos

-- Tabla de hechos de ventas, relacionada con las tablas DimProducts, DimVendedores y DimClientes
CREATE TABLE FactVentas (
    ID_Transaccion INT PRIMARY KEY,
    ID_Producto INT,
    ID_Vendedor INT,
    ID_Cliente INT,
    Cantidad INT,
    Venta DECIMAL(10, 2),
    Costo DECIMAL(10, 2),
    FOREIGN KEY (ID_Producto) REFERENCES DimProducts(ID_Producto), -- Relación de muchos a uno con DimProducts
    FOREIGN KEY (ID_Vendedor) REFERENCES DimVendedores(ID_Vendedor), -- Relación de muchos a uno con DimVendedores
    FOREIGN KEY (ID_Cliente) REFERENCES DimClientes(ID_Cliente) -- Relación de muchos a uno con DimClientes
);

-- Tabla de facturas
CREATE TABLE FecFacturas (
    ID_Factura INT PRIMARY KEY,
    Fecha_Envio DATE,
    Fecha_Venta DATE
);

-- Tabla intermedia para relacionar ventas y facturas
CREATE TABLE IntVenta_Facturas (
    ID_Int INT PRIMARY KEY,
    ID_Transaccion INT,
    ID_Factura INT,
    FOREIGN KEY (ID_Transaccion) REFERENCES FactVentas(ID_Transaccion), -- Relación de muchos a uno con FactVentas
    FOREIGN KEY (ID_Factura) REFERENCES FecFacturas(ID_Factura) -- Relación de muchos a uno con FecFacturas
);
