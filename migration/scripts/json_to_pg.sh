ogr2ogr -progress --config PG_USE_COPY YES -f PostgreSQL PG:" dbname=${DBNAME} host=${HOST} port=${PORT} user=${USER} password=${PASSWORD}
active_schema=${SCHEMA} " -lco DIM=2 ./${FILE_NAME}.geojson ${TABLE_NAME} -overwrite -nlt MULTIPOLYGON -lco GEOMETRY_NAME=geom -lco FID=id -nln ${SCHEMA}.${TABLE_NAME} -a_srs EPSG:4326 -nlt PROMOTE_TO_MULTI
