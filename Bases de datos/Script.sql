DROP DATABASE IF EXISTS mujeres_digitales;
CREATE DATABASE mujeres_digitales;
USE mujeres_digitales;

CREATE TABLE ROLES(
	id_rol int auto_increment not null,
    nombre_rol varchar(50),
    primary key(id_rol)
);
CREATE TABLE USUARIAS(
	id_usuaria int auto_increment not null,
    email varchar(50),
    password varchar(200),
    id_rol_fk int,
    primary key(id_usuaria),
    foreign key(id_rol_fk) references roles(id_rol)
);



CREATE TABLE TIPO_DOCUMENTO(
	id_tipo_documento int auto_increment not null,
    nombre_documento varchar(50),
    primary key(id_tipo_documento)
);

CREATE TABLE CATEGORIAS_SERVICIOS(
	id_categoria int auto_increment not null,
    nombre_categoria varchar(50),
    primary key(id_categoria)
);

CREATE TABLE TIPOS_SERVICIOS(
	id_tipo_servicio int auto_increment not null,
    nombre_tipo_servicio varchar(50),
    primary key(id_tipo_servicio)
);

CREATE TABLE SERVICIOS(
	id_servicio int auto_increment not null,
    id_categoria_fk int,
    id_tipo_servicio_fk int,
    codigo_servicio int, 
    nombre_servicio varchar(50),
    descripcion_servicio varchar(500),
    primary key(id_servicio),
    foreign key( id_categoria_fk) references categorias_servicios(id_categoria),
    foreign key( id_tipo_servicio_fk) references tipos_servicios(id_tipo_servicio)
);


CREATE TABLE PERSONAS(  
id_persona int auto_increment not null,     
id_tipo_documento_fk int,     
id_usuaria int,     
nombres_persona varchar(50),  
apellidos_personas varchar(50),     
telefono_persona bigint,     
ciudad varchar(50),     
direccion varchar(50),     
ocupacion varchar(50),     
id_servicios_preferencia_uno int,     
id_servicios_preferencia_dos int,    
primary key(id_persona),     
foreign key(id_usuaria) references usuarias(id_usuaria),     
foreign key(id_tipo_documento_fk) references tipo_documento(id_tipo_documento)
);

CREATE TABLE ESTABLECIMIENTOS_SERVICIOS(
	id_est_servicio int auto_increment not null,
    id_servicio_fk int,
    codigo_est_servicio int, 
    nombre_est_servicio varchar(50),
    responsable_est_servicio varchar(50),
    direccion_est_servicio varchar(50),
    primary key(id_est_servicio),
    foreign key(id_servicio_fk) references servicios(id_servicio)
);

CREATE TABLE MUNICIPIOS(
	id_municipio int auto_increment not null,
    codigo_municipio int, 
    nombre_municipio varchar(50),
    primary key(id_municipio)
);

CREATE TABLE MANZANAS(
	id_manzana int auto_increment not null,
    id_municipio_fk int,
    codigo_manzana int,
    nombre_manzana varchar(50),
    localidad varchar(50),
    direccion varchar(50),
    primary key(id_manzana),
    foreign key(id_municipio_fk) references municipios(id_municipio)
);

CREATE TABLE CITAS(
	id_cita int auto_increment not null,
    id_manzana_fk int,
    id_servicio_fk int,
    dia_cita date,
    hora_cita time,
    codigo_servicio int, 
    primary key(id_cita),
    foreign key(id_manzana_fk) references manzanas(id_manzana),
    foreign key(id_servicio_fk ) references servicios(id_servicio)
);

CREATE TABLE AGENDA(
	id_agenda int auto_increment not null,
	id_cita_fk int,
	id_persona_fk int,
    primary key(id_agenda),
    foreign key(id_cita_fk) references citas(id_cita),
    foreign key(id_persona_fk) references personas(id_persona)
);

