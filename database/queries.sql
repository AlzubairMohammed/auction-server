-- users queries

-- Create managers table
CREATE TABLE managers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create admins table
CREATE TABLE admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create users table
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    admin_id BIGINT UNSIGNED NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- Create roles table
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create admin_roles table
CREATE TABLE admin_roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    admin_id BIGINT UNSIGNED NOT NULL,
    role_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create user_roles table
CREATE TABLE user_roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create permissions table
CREATE TABLE permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create role_permissions table
CREATE TABLE role_permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- auctions queries

-- Create auctions table
CREATE TABLE auctions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    assignment_number VARCHAR(255) NOT NULL,
    auction_type ENUM('type1', 'type2', 'type3') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create realestate_types table
CREATE TABLE realestate_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


-- Create realestates table
CREATE TABLE realestates (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    owner_number VARCHAR(255) NOT NULL,
    customer_number VARCHAR(255) NOT NULL,
    auction_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (auction_id) REFERENCES auctions(id)
);

-- Create realestate_documents table
CREATE TABLE realestate_documents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(255) NOT NULL,
    owner_number VARCHAR(255),
    customer_name VARCHAR(255),
    order_number VARCHAR(255),
    path VARCHAR(255),
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id)
);

-- Create areas table
CREATE TABLE areas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create cities table
CREATE TABLE cities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    area_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (area_id) REFERENCES areas(id)
);

-- Create realestate_licenses table
CREATE TABLE realestate_licenses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    number INTEGER NOT NULL,
    issuance_place_id BIGINT UNSIGNED NOT NULL,
    realestate_type_id BIGINT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    path VARCHAR(255) NOT NULL,
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id),
    FOREIGN KEY (issuance_place_id) REFERENCES cities(id),
    FOREIGN KEY (realestate_type_id) REFERENCES realestate_types(id)
);

-- Create quarter table
CREATE TABLE quarters (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- Create realestate_owners table
CREATE TABLE realestate_owners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    identity_number INTEGER NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    ownership_percentage INTEGER NOT NULL,
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id)
);

-- Create realestate_files table
CREATE TABLE realestate_files (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE
);

-- scans queries

CREATE TABLE scans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    lat VARCHAR(255) NOT NULL,
    lng VARCHAR(255) NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE
);

CREATE TABLE realestate_properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    string_value VARCHAR(255),
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE
);

CREATE TABLE components (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE realestate_components (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    realestate_id BIGINT UNSIGNED NOT NULL,
    component_id BIGINT UNSIGNED NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE,
    FOREIGN KEY (component_id) REFERENCES components(id) ON DELETE CASCADE
);


CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    admin_id BIGINT UNSIGNED NOT NULL,
    auction_id BIGINT UNSIGNED NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE
);

CREATE TABLE realestate_images_descriptions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE realestate_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    realestate_id BIGINT UNSIGNED,
    realestate_images_description_id BIGINT UNSIGNED,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE,
    FOREIGN KEY (realestate_images_description_id) REFERENCES realestate_images_descriptions(id) ON DELETE CASCADE
);


CREATE TABLE realestate_features (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE realestate_feature_options (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    realestate_id BIGINT UNSIGNED NOT NULL,
    realestate_feature_id BIGINT UNSIGNED NOT NULL,
    value BOOLEAN NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE,
    FOREIGN KEY (realestate_feature_id) REFERENCES realestate_features(id) ON DELETE CASCADE
);

-- evaluations queries

CREATE TABLE comparisons_evaluations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    meter_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE direct_capitalization_evaluations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cross_income DECIMAL(10, 2) NOT NULL,
    operation_income_rate INT NOT NULL,
    capitalization_rate INT NOT NULL,
    ownership_percentage INT NOT NULL,
    realestate_total_value DECIMAL(10, 2) NOT NULL,
    net_income DECIMAL(10, 2) NOT NULL,
    operation_cost DECIMAL(10, 2) NOT NULL,
    realestate_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE
);

CREATE TABLE comparisons_evaluation_properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    percentage INT NOT NULL
    );


CREATE TABLE comparisons_evaluation_realestates ( 
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    comparisons_evaluation_id BIGINT UNSIGNED NOT NULL, 
    comparisons_evaluation_properties_id BIGINT UNSIGNED NOT NULL, 
    meter_price DECIMAL(10, 2) NOT NULL, 
    weighted INT NOT NULL, 
    FOREIGN KEY (comparisons_evaluation_id) REFERENCES comparisons_evaluations(id) ON DELETE CASCADE, 
    FOREIGN KEY (comparisons_evaluation_properties_id) REFERENCES comparisons_evaluation_properties(id) ON DELETE CASCADE 
);

CREATE TABLE cost_evaluations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    realestate_id BIGINT UNSIGNED NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    building_cost DECIMAL(10, 2) NOT NULL,
    building_cost_after_depreciation DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (realestate_id) REFERENCES realestates(id) ON DELETE CASCADE
);

CREATE TABLE direct_costs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cost_evaluation_id BIGINT UNSIGNED NOT NULL,
    direct_cost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cost_evaluation_id) REFERENCES cost_evaluations(id) ON DELETE CASCADE
); 

CREATE TABLE direct_cost_components (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    direct_cost_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    meter_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (direct_cost_id) REFERENCES direct_costs(id) ON DELETE CASCADE
);

CREATE TABLE indirect_costs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cost_evaluation_id BIGINT UNSIGNED NOT NULL,
    indirect_cost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cost_evaluation_id) REFERENCES cost_evaluations(id) ON DELETE CASCADE
);

CREATE TABLE indirect_cost_components (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    indirect_cost_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    percentage INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (indirect_cost_id) REFERENCES indirect_costs(id) ON DELETE CASCADE
);

CREATE TABLE depreciations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cost_evaluation_id BIGINT UNSIGNED NOT NULL,
    realestate_life_span INT NOT NULL,
    realestate_expected_life_span INT NOT NULL,
    type ENUM('Straight Line', 'Double Declining Balance') NOT NULL,
    depreciation_rate INT NOT NULL,
    depreciation_value DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cost_evaluation_id) REFERENCES cost_evaluations(id) ON DELETE CASCADE
);