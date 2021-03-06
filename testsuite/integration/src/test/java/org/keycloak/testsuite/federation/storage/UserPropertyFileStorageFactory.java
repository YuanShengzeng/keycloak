/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.keycloak.testsuite.federation.storage;

import org.keycloak.Config;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.ProviderFactory;
import org.keycloak.storage.StorageProvider;
import org.keycloak.storage.StorageProviderFactory;
import org.keycloak.storage.StorageProviderModel;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * @author <a href="mailto:bill@burkecentral.com">Bill Burke</a>
 * @version $Revision: 1 $
 */
public class UserPropertyFileStorageFactory implements StorageProviderFactory {


    public static final String PROVIDER_ID = "user-password-props";

    @Override
    public boolean supports(Class<?> type) {
        return type.isAssignableFrom(UserPropertyFileStorage.class);
    }

    @Override
    public StorageProvider getInstance(KeycloakSession session, StorageProviderModel model) {
        Properties props = new Properties();
        try {
            props.load(getClass().getResourceAsStream("/storage-test/user-password.properties"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new UserPropertyFileStorage(session, model, props);
    }

    @Override
    public Set<String> getConfigurationOptions() {
        return null;
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public StorageProvider create(KeycloakSession session) {
        return null;
    }

    @Override
    public void init(Config.Scope config) {

    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {

    }

    @Override
    public void close() {

    }
}
