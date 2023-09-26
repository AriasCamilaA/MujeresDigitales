
from django.db import models


class Agenda(models.Model):
    id_agenda = models.AutoField(primary_key=True)
    id_cita_fk = models.ForeignKey('Citas', models.DO_NOTHING, db_column='id_cita_fk', blank=True, null=True)
    id_persona_fk = models.ForeignKey('Personas', models.DO_NOTHING, db_column='id_persona_fk', blank=True, null=True)

    class Meta:
         
        db_table = 'agenda'


class CategoriasServicios(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'categorias_servicios'


class Citas(models.Model):
    id_cita = models.AutoField(primary_key=True)
    id_manzana_fk = models.ForeignKey('Manzanas', models.DO_NOTHING, db_column='id_manzana_fk', blank=True, null=True)
    id_servicio_fk = models.ForeignKey('Servicios', models.DO_NOTHING, db_column='id_servicio_fk', blank=True, null=True)
    dia_cita = models.DateField(blank=True, null=True)
    hora_cita = models.TimeField(blank=True, null=True)
    codigo_servicio = models.IntegerField(blank=True, null=True)

    class Meta:
         
        db_table = 'citas'


class EstablecimientosServicios(models.Model):
    id_est_servicio = models.AutoField(primary_key=True)
    id_servicio_fk = models.ForeignKey('Servicios', models.DO_NOTHING, db_column='id_servicio_fk', blank=True, null=True)
    codigo_est_servicio = models.IntegerField(blank=True, null=True)
    nombre_est_servicio = models.CharField(max_length=50, blank=True, null=True)
    responsable_est_servicio = models.CharField(max_length=50, blank=True, null=True)
    direccion_est_servicio = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'establecimientos_servicios'


class Manzanas(models.Model):
    id_manzana = models.AutoField(primary_key=True)
    id_municipio_fk = models.ForeignKey('Municipios', models.DO_NOTHING, db_column='id_municipio_fk', blank=True, null=True)
    codigo_manzana = models.IntegerField(blank=True, null=True)
    nombre_manzana = models.CharField(max_length=50, blank=True, null=True)
    localidad = models.CharField(max_length=50, blank=True, null=True)
    direccion = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'manzanas'


class Municipios(models.Model):
    id_municipio = models.AutoField(primary_key=True)
    codigo_municipio = models.IntegerField(blank=True, null=True)
    nombre_municipio = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'municipios'


class Personas(models.Model):
    id_persona = models.AutoField(primary_key=True)
    id_tipo_documento_fk = models.ForeignKey('TipoDocumento', models.DO_NOTHING, db_column='id_tipo_documento_fk', blank=True, null=True)
    id_usuaria = models.ForeignKey('Usuarias', models.DO_NOTHING, db_column='id_usuaria', blank=True, null=True)
    nombres_persona = models.CharField(max_length=50, blank=True, null=True)
    apellidos_personas = models.CharField(max_length=50, blank=True, null=True)
    telefono_persona = models.BigIntegerField(blank=True, null=True)
    ciudad = models.CharField(max_length=50, blank=True, null=True)
    direccion = models.CharField(max_length=50, blank=True, null=True)
    ocupacion = models.CharField(max_length=50, blank=True, null=True)
    id_servicios_preferencia_uno = models.IntegerField(blank=True, null=True)
    id_servicios_preferencia_dos = models.IntegerField(blank=True, null=True)

    class Meta:
         
        db_table = 'personas'


class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'roles'


class Servicios(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    id_categoria_fk = models.ForeignKey(CategoriasServicios, models.DO_NOTHING, db_column='id_categoria_fk', blank=True, null=True)
    id_tipo_servicio_fk = models.ForeignKey('TiposServicios', models.DO_NOTHING, db_column='id_tipo_servicio_fk', blank=True, null=True)
    codigo_servicio = models.IntegerField(blank=True, null=True)
    nombre_servicio = models.CharField(max_length=50, blank=True, null=True)
    descripcion_servicio = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
         
        db_table = 'servicios'


class TipoDocumento(models.Model):
    id_tipo_documento = models.AutoField(primary_key=True)
    nombre_documento = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'tipo_documento'


class TiposServicios(models.Model):
    id_tipo_servicio = models.AutoField(primary_key=True)
    nombre_tipo_servicio = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
         
        db_table = 'tipos_servicios'


class Usuarias(models.Model):
    id_usuaria = models.AutoField(primary_key=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=200, blank=True, null=True)
    id_rol_fk = models.ForeignKey(Roles, models.DO_NOTHING, db_column='id_rol_fk', blank=True, null=True)

    class Meta:
         
        db_table = 'usuarias'
