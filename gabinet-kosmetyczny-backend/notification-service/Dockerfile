FROM openjdk:11
ARG JAR_FILE=target/*.jar
ADD ${JAR_FILE} app.jar
EXPOSE 8104
ENTRYPOINT ["java","-jar","/app.jar"]
