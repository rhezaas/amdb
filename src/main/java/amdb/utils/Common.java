package amdb.utils;

import jakarta.inject.Singleton;

import com.fasterxml.jackson.databind.ObjectMapper;


@Singleton
public class Common {
    public static final ObjectMapper mapper = new ObjectMapper();
}
