FROM eclipse-temurin:17-jdk-alpine
RUN dir -s
WORKDIR /app
RUN dir -s
COPY backend/target/careercraftai.jar careercraftai.jar
RUN dir -s
EXPOSE 8080
CMD ["java","-jar","careercraftai.jar"]