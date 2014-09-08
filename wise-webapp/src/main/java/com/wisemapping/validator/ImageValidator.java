package com.wisemapping.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class ImageValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(Image.class);
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}
