// Report - As a tenant, I want to have a sales report
//  Tenant dapat melihat laporan penjualan
//  Laporan penjualan berdasarkan :
//    Property
//    Transaction
//    User
//  Sort by : date, total penjualan
//  Filter by : date (range)

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Center,
} from "@chakra-ui/react";
import { FaSearch, FaCalendar } from "react-icons/fa";

function SalesReport() {
  const [property, setProperty] = useState("");
  const [transaction, setTransaction] = useState("");
  const [user, setUser] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      // Fetch filtered sales data
      fetch(`/sales/filter?startDate=${startDate}&endDate=${endDate}`)
        .then((response) => response.json())
        .then((data) => {
          setSalesData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError("An error occurred while fetching the sales data.");
          setIsLoading(false);
        });
    } else {
      // Fetch sales data
      fetch(
        `/sales?property=${property}&transaction=${transaction}&user=${user}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSalesData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError("An error occurred while fetching the sales data.");
          setIsLoading(false);
        });
    }
  }, [property, transaction, user, startDate, endDate]);

  const handlePropertyChange = (event) => {
    setProperty(event.target.value);
    setSalesData([]);
    setError("");
  };

  const handleTransactionChange = (event) => {
    setTransaction(event.target.value);
    setSalesData([]);
    setError("");
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
    setSalesData([]);
    setError("");
  };

  const handleSort = (column) => {
    const sortedSalesData = salesData.sort((a, b) => {
      if (column === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (column === "totalSales") {
        return a.totalSales - b.totalSales;
      }
    });

    setSalesData(sortedSalesData);
  };

  const handleFilter = () => {
    setIsLoading(true);
  };

  const handleClearFilters = () => {
    setProperty("");
    setTransaction("");
    setUser("");
    setStartDate(null);
    setEndDate(null);
    setSalesData([]);
    setError("");
  };

  return (
    <Box>
      <Heading as="h1" size="lg" mb="4">
        Sales Report
      </Heading>

      <Flex mb="4">
        <Box mr="4">
          <FormControl id="property" isRequired>
            <FormLabel>Property</FormLabel>
            <Select
              placeholder="Select Property"
              value={property}
              onChange={handlePropertyChange}
            >
              <option value="property1">Property 1</option>
              <option value="property2">Property 2</option>
              <option value="property3">Property 3</option>
            </Select>
          </FormControl>
        </Box>

        <Box mr="4">
          <FormControl id="transaction" isRequired>
            <FormLabel>Transaction</FormLabel>
            <Select
              placeholder="Select Transaction"
              value={transaction}
              onChange={handleTransactionChange}
            >
              <option value="transaction1">Transaction 1</option>
              <option value="transaction2">Transaction 2</option>
              <option value="transaction3">Transaction 3</option>
            </Select>
          </FormControl>
        </Box>

        <Box mr="4">
          <FormControl id="user" isRequired>
            <FormLabel>User</FormLabel>
            <Select
              placeholder="Select User"
              value={user}
              onChange={handleUserChange}
            >
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </Select>
          </FormControl>
        </Box>

        <Box mr="4">
          <FormControl id="startDate" isRequired>
            <FormLabel>Start Date</FormLabel>
            <InputGroup>
              <InputLeftElement children={<Icon as={FaCalendar} />} />
              <Input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Box>

        <Box mr="4">
          <FormControl id="endDate" isRequired>
            <FormLabel>End Date</FormLabel>
            <InputGroup>
              <InputLeftElement children={<Icon as={FaCalendar} />} />
              <Input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Box>

        <Button colorScheme="blue" onClick={handleFilter} isLoading={isLoading}>
          Filter
        </Button>

        <Button ml="2" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Flex>

      {error && (
        <Box mb="4">
          <Text color="red">{error}</Text>
        </Box>
      )}

      {salesData.length > 0 ? (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort("date")}>Date</Th>
              <Th onClick={() => handleSort("totalSales")}>Total Sales</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salesData.map((sales) => (
              <Tr key={sales.id}>
                <Td>{sales.date}</Td>
                <Td>{sales.totalSales}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Center>
          <VStack spacing="4">
            <Text>No sales data available.</Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
}

export default SalesReport;
