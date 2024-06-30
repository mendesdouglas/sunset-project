FROM postgres

ENV POSTGRES_PASSWORD=43de0f
ENV POSTGRES_USER=postgres

VOLUME /var/lib/postgresql/data

EXPOSE 5432