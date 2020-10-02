set -e
SERVER_DIR="./grpc-server"
echo "Creating a virtualenv using python3"
python3 -m venv venv
echo "Created virtualenv"
source venv/bin/activate
echo "Installing the required libraries"
pip install -r ${SERVER_DIR}/requirements.txt -q
echo "Installed binaries"
echo "Staring the backend server"
python3 ${SERVER_DIR}/greeter_server.py
