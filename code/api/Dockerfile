FROM python:3.8.0-alpine
WORKDIR /api
COPY . .

RUN python3 -m pip install --upgrade pip
RUN apk update && apk add python3-dev \
                        gcc \
                        g++ \
                        libc-dev
RUN apk --update --upgrade add gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev

RUN python3 -m pip install --no-cache-dir -r requirements.txt
ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
RUN mkdir uploads
EXPOSE 5555
ENTRYPOINT ["python"]
CMD ["server.py"]
