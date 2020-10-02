set -e

temp_dir="proxy_path"

function get_os(){
    case "$OSTYPE" in
    darwin*)  echo "osx" ;; 
    linux*)   echo "linux" ;;
    *)        echo "unknown: $OSTYPE" ;;
    esac  
}

function get_arch(){
    echo $(uname -m)
}

function get_download_link(){
    os=$(get_os)
    arch=$(get_arch)

    case "$os" in
    
    unknown*) >&2 echo "Unknown os architecture!
    Please download the suitable binary for proxy from https://github.com/improbable-eng/grpc-web/releases
    and start it as
    ======================================
    ./grpcwebproxy-v0.13.0-osx-x86_64 \\
    --backend_addr=localhost:9090 \\
    --backend_tls_noverify \\
    --run_tls_server=false \\
    --allow_all_origins
    ======================================
    Start python server as 
    ./grpc-server/start_python_server.sh"; exit 1;;
    *) echo "https://github.com/improbable-eng/grpc-web/releases/download/v0.13.0/grpcwebproxy-v0.13.0-${os}-${arch}.zip"
    esac

    
}


function download_binary(){
    url=$(get_download_link)
    unzip_out="${temp_dir}/proxy.zip"
    eval "mkdir -p ${temp_dir}"
    echo "\nPreparing to download the grpcwebproxy binary to ${unzip_out}\n"
    eval "curl -L ${url} --output ${unzip_out}"
    echo "\nExctracting the downloaded binary to ${temp_dir}\n"
    eval "unzip -o ${unzip_out} -d ${temp_dir}"
    eval "rm -rf ${unzip_out}"

}

function start_proxy_server(){
    dist_dir="${temp_dir}/dist"
    if [ ! -d "$dist_dir" ]; then
        download_binary
    fi

    bin=`ls ${temp_dir}/dist`
    eval "./${temp_dir}/dist/$bin --backend_addr=localhost:9090 --backend_tls_noverify --run_tls_server=false --allow_all_origins"
    echo "The proxy is up and running..."


}

start_proxy_server