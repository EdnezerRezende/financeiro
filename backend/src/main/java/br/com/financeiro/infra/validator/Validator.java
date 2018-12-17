package br.com.financeiro.infra.validator;

import org.springframework.util.StringUtils;

public abstract class Validator {
    public static boolean isNull(Object value) {
        if (value instanceof String) {
            if (StringUtils.isEmpty(value)) {
                return true;
            }
        } else if (value == null) {
            return true;
        }
        return false;
    }

    public static void isNull(Object value, String message, Object... fields) {
        if (!isNull(value)) {
            throw new RuntimeException(message);
        }
    }

    public static boolean isNotNull(Object value) {
        if (value instanceof String) {
            if (!StringUtils.isEmpty(value)) {
                return true;
            }
        } else if (value != null) {
            return true;
        }
        return false;
    }

    public static void isNotNull(Object value, String message, Object... fields) {
        if (!isNotNull(value)) {
            throw new RuntimeException(message);
        }
    }

    public static boolean isEquals(Object first, Object second) {
        return isNotNull(first) && isNotNull(second) && first.equals(second);
    }

    public static void isEquals(Object first, Object second, String message, Object... fields) {
        isNotNull(first, message, fields);
        isNotNull(second, message, fields);
        if (!first.equals(second)) {
            throw new RuntimeException(message);
        }
    }

    public static void isEqualsNull(Object first, Object second, Object third, String message, Object... fields) {
        isNotNull(first, message, fields);
        isNotNull(second, message, fields);
        isNotNull(third, message, fields);

    }

    public static void isTrue(Boolean validation, String message, Object... fields) {
        isNotNull(validation, message, fields);
        if (!validation) {
            throw new RuntimeException(message);
        }
    }
}
