# Use a base image that has both curl and git, such as a Debian or Ubuntu image
FROM debian:bullseye-slim

# Install curl, git, build essentials, and other necessary tools
RUN apt-get update && apt-get install -y curl git build-essential

# Install Rust via rustup
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Clone the circom repo and build it
RUN git clone https://github.com/iden3/circom.git
WORKDIR /circom
RUN cargo build --release
RUN cargo install --path .

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Set the working directory to where circuits will be located
WORKDIR /app/circuits

# Copy the entire circuits directory
COPY src/circuits .

# Install npm dependencies
RUN npm install

# Use an argument to specify which circuit's test script to run
ARG CIRCUIT_DIR="verify_sig"

# Set permissions for all test.sh scripts (in case they're not set in the repo)
RUN find . -name test.sh -exec chmod +x {} \;

# Set the entry point to a script that runs the specified circuit's test.sh
# This script will need to be created and copied into the image
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["$CIRCUIT_DIR"]
