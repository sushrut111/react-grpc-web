set -e
PROTO_DIR=$1
FILE_PATH=$2
OUTPUT_DIR="./src/grpc/"

mkdir -p $OUTPUT_DIR
protoc -I $PROTO_DIR \
  --js_out=import_style=commonjs:$OUTPUT_DIR \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$OUTPUT_DIR \
  $FILE_PATH