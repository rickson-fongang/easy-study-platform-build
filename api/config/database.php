<?php
class Database {
    private $host = "tramway.proxy.rlwy.net";
    private $db_name = "railway"; // default Railway DB name
    private $username = "root";
    private $password = "ZHwqVHydwhBhKKKRUNWeLxzhvdywkmPn";
    private $port = "42205"; // Railway MySQL port
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
