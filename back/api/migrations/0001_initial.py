# Generated by Django 4.2.5 on 2023-09-27 19:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriasServicios',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_categoria', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'categorias_servicios',
            },
        ),
        migrations.CreateModel(
            name='Municipios',
            fields=[
                ('id_municipio', models.AutoField(primary_key=True, serialize=False)),
                ('codigo_municipio', models.IntegerField(blank=True, null=True)),
                ('nombre_municipio', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'municipios',
            },
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id_rol', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_rol', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'roles',
            },
        ),
        migrations.CreateModel(
            name='TipoDocumento',
            fields=[
                ('id_tipo_documento', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_documento', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tipo_documento',
            },
        ),
        migrations.CreateModel(
            name='TiposServicios',
            fields=[
                ('id_tipo_servicio', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_tipo_servicio', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tipos_servicios',
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id_usuaria', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('password', models.CharField(blank=True, max_length=200, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_rol_fk', models.ForeignKey(blank=True, db_column='id_rol_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.roles')),
            ],
            options={
                'db_table': 'Users',
            },
        ),
        migrations.CreateModel(
            name='Servicios',
            fields=[
                ('id_servicio', models.AutoField(primary_key=True, serialize=False)),
                ('codigo_servicio', models.IntegerField(blank=True, null=True)),
                ('nombre_servicio', models.CharField(blank=True, max_length=50, null=True)),
                ('descripcion_servicio', models.CharField(blank=True, max_length=500, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_categoria_fk', models.ForeignKey(blank=True, db_column='id_categoria_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.categoriasservicios')),
                ('id_tipo_servicio_fk', models.ForeignKey(blank=True, db_column='id_tipo_servicio_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.tiposservicios')),
            ],
            options={
                'db_table': 'servicios',
            },
        ),
        migrations.CreateModel(
            name='Personas',
            fields=[
                ('id_persona', models.IntegerField(primary_key=True, serialize=False)),
                ('nombres_persona', models.CharField(blank=True, max_length=50, null=True)),
                ('apellidos_personas', models.CharField(blank=True, max_length=50, null=True)),
                ('telefono_persona', models.BigIntegerField(blank=True, null=True)),
                ('ciudad', models.CharField(blank=True, max_length=50, null=True)),
                ('direccion', models.CharField(blank=True, max_length=50, null=True)),
                ('ocupacion', models.CharField(blank=True, max_length=50, null=True)),
                ('id_servicios_preferencia_uno', models.IntegerField(blank=True, null=True)),
                ('id_servicios_preferencia_dos', models.IntegerField(blank=True, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_tipo_documento_fk', models.ForeignKey(blank=True, db_column='id_tipo_documento_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.tipodocumento')),
                ('id_usuaria', models.ForeignKey(blank=True, db_column='id_usuaria', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.Users')),
            ],
            options={
                'db_table': 'personas',
            },
        ),
        migrations.CreateModel(
            name='Manzanas',
            fields=[
                ('id_manzana', models.AutoField(primary_key=True, serialize=False)),
                ('codigo_manzana', models.IntegerField(blank=True, null=True)),
                ('nombre_manzana', models.CharField(blank=True, max_length=50, null=True)),
                ('localidad', models.CharField(blank=True, max_length=50, null=True)),
                ('direccion', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_municipio_fk', models.ForeignKey(blank=True, db_column='id_municipio_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.municipios')),
            ],
            options={
                'db_table': 'manzanas',
            },
        ),
        migrations.CreateModel(
            name='EstablecimientosServicios',
            fields=[
                ('id_est_servicio', models.AutoField(primary_key=True, serialize=False)),
                ('codigo_est_servicio', models.IntegerField(blank=True, null=True)),
                ('nombre_est_servicio', models.CharField(blank=True, max_length=50, null=True)),
                ('responsable_est_servicio', models.CharField(blank=True, max_length=50, null=True)),
                ('direccion_est_servicio', models.CharField(blank=True, max_length=50, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_servicio_fk', models.ForeignKey(blank=True, db_column='id_servicio_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.servicios')),
            ],
            options={
                'db_table': 'establecimientos_servicios',
            },
        ),
        migrations.CreateModel(
            name='Citas',
            fields=[
                ('id_cita', models.AutoField(primary_key=True, serialize=False)),
                ('dia_cita', models.DateField(blank=True, null=True)),
                ('hora_cita', models.TimeField(blank=True, null=True)),
                ('codigo_servicio', models.IntegerField(blank=True, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_manzana_fk', models.ForeignKey(blank=True, db_column='id_manzana_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.manzanas')),
                ('id_servicio_fk', models.ForeignKey(blank=True, db_column='id_servicio_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.servicios')),
            ],
            options={
                'db_table': 'citas',
            },
        ),
        migrations.CreateModel(
            name='Agenda',
            fields=[
                ('id_agenda', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('id_cita_fk', models.ForeignKey(blank=True, db_column='id_cita_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.citas')),
                ('id_persona_fk', models.ForeignKey(blank=True, db_column='id_persona_fk', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.personas')),
            ],
            options={
                'db_table': 'agenda',
            },
        ),
    ]
