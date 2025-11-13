FROM mcr.microsoft.com/dotnet/sdk:9.0 AS dev
WORKDIR /src
COPY ["tech-test-million.csproj", "./"]
RUN dotnet restore "tech-test-million.csproj"
COPY . .

# Install dotnet-watch for file watching
RUN dotnet tool install --global dotnet-watch

# Make sure dotnet tools are available in PATH
ENV PATH="$PATH:/root/.dotnet/tools"

# Expose the port used in Development
EXPOSE 5254

# Run with dotnet watch in development mode for hot reload
ENTRYPOINT ["dotnet", "watch", "--project", "tech-test-million.csproj", "run", "--urls", "http://0.0.0.0:5254", "--environment", "Development"]