FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY ./polifarm.sln ./
COPY ./polifarm/WebApi.csproj ./polifarm/
COPY ./Application/Application.csproj ./Application/
COPY ./Domain/Domain.csproj ./Domain/
COPY ./Infra/Infra.csproj ./Infra/

RUN dotnet restore

COPY . .

RUN dotnet publish ./polifarm/WebApi.csproj -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "WebApi.dll"]